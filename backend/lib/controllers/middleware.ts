import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { clerkClient, LooseAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import client from "../../utils/client";

const prisma = client;

const optionalUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userId = (req as Request & LooseAuthProp).auth?.userId;
  if (!userId) {
    return next(new Error("User ID is null"));
  }
  //   find clerk user
  const clerkUser = await clerkClient.users.getUser(userId);
  const clerkId = clerkUser.id;

  if (!clerkId) {
    console.error("no clerkId");
    return next();
  }

  //   Does user exist in db?
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  //   Pass user into next() if it exists in DB
  if (user) {
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        imageUrl: clerkUser.imageUrl,
        name: clerkUser.firstName || "User",
      },
      create: {
        user: { connect: { id: user.id } },
        imageUrl: clerkUser.imageUrl,
        name: clerkUser.firstName || "User",
      },
    });
    req.user = { userId: user.id };
  } else {
    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkId,
      },
    });
    await prisma.profile.create({
      data: {
        user: { connect: { id: newUser.id } },
        imageUrl: clerkUser.imageUrl,
        name: clerkUser.firstName || "",
      },
    });
    req.user = { userId: newUser.id };
  }

  next();
};

export default optionalUser;
