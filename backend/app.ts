import "dotenv/config";
import express from "express";
import cors from "cors";
// import userRouter from "./lib/controllers/users/controller";
import profileRouter from "./lib/controllers/profile/controller";
import movieRouter from "./lib/controllers/movies/movie";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://letterboxd-clone-yaya.netlify.app",
    ],
    allowedHeaders: ["Authorization", "Content-Type", "Accept"],
  })
);

app.use(express.json());

// app.use("/api", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/profile", profileRouter);

export default app;
