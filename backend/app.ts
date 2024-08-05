import express from "express";
import cors from "cors";
import authRouter from "./lib/controllers/auth/controller";
import { requireAuth } from "./utils/requireAuth";

const app = express();

app.use(
	cors({
		origin: ['origin(s)'],
		allowedHeaders: ['Authorization', 'Content-Type'],
	})
);

app.use(express.json());

app.use("/api/auth", requireAuth, authRouter);

export default app;
