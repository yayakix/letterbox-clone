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
    const profile = await profileClient.getProfile(req.user.userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all comments a user has made
profileRouter.get("/yaps", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const yaps = await profileClient.getYaps(req.user.userId);
    res.json(yaps);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// post a comment to a film
profileRouter.post("/yaps/:filmId", async (req, res) => {
  console.log(req.body);
  console.log("hit");
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const yap = await profileClient.postYap(
      req.user.userId,
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
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const likedFilms = await profileClient.getLikedFilms(req.user.userId);
    res.json(likedFilms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// toggle liking a film
profileRouter.post("/liked/:filmId", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log("filmid:", req.params.filmId);
  try {
    const likedFilm = await profileClient.toggleFilmLike(
      req.user.userId,
      req.params.filmId
    );
    res.json(likedFilm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/network", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const following = await profileClient.getFollowing(req.user.id);
    const followers = await profileClient.getFollowers(req.user.id);
    console.log("following", following);
    console.log("followers", followers);
    const network = { following, followers };
    res.json(network);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all films a user has watched
profileRouter.get("/watched", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const watchedFilms = await profileClient.getWatchedFilms(req.user.userId);
    res.json(watchedFilms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// watch a film
profileRouter.post("/watched/:filmId", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const watchedFilm = await profileClient.toggleFilmWatched(
      req.user.userId,
      req.params.filmId
    );
    res.json(watchedFilm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

profileRouter.get("/isWatchedOrLiked/:filmId", async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const isWatchedOrLiked = await profileClient.isMovieWatchedOrLiked(
    req.user.userId,
    req.params.filmId
  );
  res.json(isWatchedOrLiked);
});

export default profileRouter;
