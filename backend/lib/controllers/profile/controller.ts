import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import optionalUser from "../middleware";
import "dotenv/config";
import profileClient from "./profileClient";

const profileRouter = express.Router();
profileRouter.use(ClerkExpressRequireAuth());
profileRouter.use(optionalUser);

// get user profile
profileRouter.get("/", async (req, res) => {
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

// Get all comments a user has made
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
// post a comment to a film
profileRouter.post("/yaps/:filmId", async (req, res) => {
  console.log(req.body);
  console.log("hit");
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const yap = await profileClient.postYap(
      req.user.id,
      req.body.content,
      req.params.filmId
    );
    res.json(yap);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all films a user has liked
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

// like a film
profileRouter.post("/liked/:filmId", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const likedFilm = await profileClient.addFilmToLiked(
      req.user.id,
      req.params.filmId
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

// get all films a user has watched
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

// watch a film
profileRouter.post("/watched/:filmId", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const watchedFilm = await profileClient.addFilmToWatched(
      req.user.id,
      req.params.filmId
    );
    res.json(watchedFilm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default profileRouter;
