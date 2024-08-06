import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { clerkClient, LooseAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import client from "../../utils/client";

const prisma = client;

const optionalUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as Request & LooseAuthProp).auth?.userId;
  console.log('erm', userId)
  if (!userId) {
    return next(new Error("User ID is null"));
  }
  //   find clerk user
  const clerkUser = await clerkClient.users.getUser(userId);
  const clerkId = clerkUser.id;

  if (!clerkId) {
    console.log("no clerkId");
    return next();
  }
  console.log('clerkid', clerkId)

  //   Does user exist in db?
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
  console.log('db user', user)

  //   Pass user into next() if it exists in DB
  if (user) {
    console.log('is this user real')
    // append user to request context
    req.user = user;
  } else {
    console.log('this would be wrong')
    // Else: Create a new user in DB and append to request context
    req.user = await prisma.user.create({
      data: {
        clerkId: clerkId,
      },
    });
    console.log("user created");
  }
  console.log('end of this')
  next();
};

export default optionalUser;
