import express from "express";
import cors from "cors";
import userRouter from "./lib/controllers/users/controller";
import profileRouter from "./lib/controllers/profile/controller";
import movieRouter from "./lib/controllers/movies/movie";

import "dotenv/config";

const app = express();

app.use(cors({ allowedHeaders: ["Authorization", "Content-Type"] }));

app.use(express.json());

// app.use("/api", userRouter);
app.use('/api', movieRouter)
app.use("/api/profile", profileRouter);


export default app;
