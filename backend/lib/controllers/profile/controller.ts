import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import optionalUser from "../middleware";
import client from "../../../utils/client";
import "dotenv/config";

const profileRouter = express.Router();
profileRouter.use(ClerkExpressRequireAuth({}));
profileRouter.use(optionalUser);

profileRouter.get("/profile", (req, res) => {
  console.log("req", req.user);
  res.send("Hello World");
});

profileRouter.get("/profile", async (req, res) => {
  try {
    const user = await client.user.findUnique({
      where: { clerkId: req.user?.clerkId },
    });
    res.json(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default profileRouter;
