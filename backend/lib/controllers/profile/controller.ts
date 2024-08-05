import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import optionalUser from "../middleware";
import "dotenv/config";
import profileClient from "./profileClient";

const profileRouter = express.Router();
profileRouter.use(ClerkExpressRequireAuth({}));
profileRouter.use(optionalUser);

profileRouter.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const profile = await profileClient.getProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/yaps", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const yaps = await profileClient.getYaps(req.user.id);
    res.json(yaps);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/liked", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const likedFilms = await profileClient.getLikedFilms(req.user.id);
    res.json(likedFilms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.post("/liked", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const likedFilm = await profileClient.addFilmToLiked(
      req.user.id,
      req.body.filmId
    );
    res.json(likedFilm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/following", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const following = await profileClient.getFollowing(req.user.id);
    res.json(following);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/followers", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const followers = await profileClient.getFollowers(req.user.id);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/watched", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const watchedFilms = await profileClient.getWatchedFilms(req.user.id);
    res.json(watchedFilms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.post("/watched", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const watchedFilm = await profileClient.addFilmToWatched(
      req.user.id,
      req.body.filmId
    );
    res.json(watchedFilm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default profileRouter;
