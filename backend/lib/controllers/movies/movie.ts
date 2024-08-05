
import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";

const movieRouter = express.Router();
const clerkAuth = ClerkExpressRequireAuth();

movieRouter.get("/profile", clerkAuth, async (req, res) => { }