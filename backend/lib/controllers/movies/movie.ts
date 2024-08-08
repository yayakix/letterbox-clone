import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";
import optionalUser from "../middleware.ts";
import ratingClient from "../ratings/ratingClient.ts";
import profileClient from "../profile/profileClient.ts";

const movieRouter = express.Router();
// const clerkAuth = ClerkExpressRequireAuth();

movieRouter.get("/", async (req, res) => {
  console.log("Request received for all movies");
  try {
    const movies = await client.film.findMany();
    res.json(movies);
    console.log("Sending movies data to client", movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

movieRouter.get("/search", ClerkExpressRequireAuth(), optionalUser, async (req, res) => {
  const search = req.query.search;
  try {
    const movies = await client.film.findMany({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

movieRouter.get(
  "/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    try {
      const movieId = req.params.id;

      const startTime = Date.now();
      const movie = await client.film.findUnique({
        where: { id: movieId },
        include: {
          ratings: {
            where: { profileId: req.user.userId },
            select: { value: true },
          },
        },
      });
      const endTime = Date.now();
      console.log(`Database query took ${endTime - startTime}ms`);

      console.log("Database response:", movie);

      if (!movie) {
        console.log("Movie not found in database");
        return res.status(404).json({ error: "Movie not found" });
      }
      const profile = await profileClient.getProfile(req.user.userId);

      const userRating = await ratingClient.getUserRating(movie.id, profile.id);
      console.log("User rating:", userRating);
      const movieWithUserRating = {
        ...movie,
        userRating,
        ratings: undefined, // Remove the ratings array from the response
      };
      res.json(movieWithUserRating);
    } catch (error) {
      console.error("Error fetching movie:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    } finally {
      console.log("Request processing completed");
    }
  }
);

movieRouter.get(
  `/yaps/:id/`,
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    console.log("Request received for movie yaps, ID:", req.params.id);
    console.log("hellllooooo");
    try {
      const movieId = req.params.id;
      console.log("Attempting to find yaps for movie with ID:", movieId);

      const yaps = await client.yap.findMany({
        where: { filmId: movieId },
        include: {
          profile: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      console.log(`Found ${yaps.length} yaps for movie`);

      res.json(yaps);
    } catch (error) {
      console.error("Error fetching movie yaps:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

movieRouter.get(
  "/rate/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const profile = await profileClient.getProfile(req.user.userId);
    const filmId = req.params.id;
    const profileId = profile.id;
    const userRating = await ratingClient.getUserRating(filmId, profileId);
    res.json({ userRating });
  }
);

movieRouter.post(
  "/rate/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    // console.log("Request received for movie ID:", req.params.id);
    const filmId = req.params.id;
    const profile = await profileClient.getProfile(req.user.userId);
    if (!profile.id) {
      return res.status(404).json({ error: "Profile id not found" });
    }
    const profileId = profile.id;
    const newRating = req.body.newRating;
    console.log("new rating is here", newRating);

    console.log("Updating movie rating to:", newRating);
    await ratingClient.updateMovieRating(filmId, profileId, newRating);
    const userRating = await ratingClient.getUserRating(filmId, profileId);
    res.json({ message: "Movie rating updated successfully", userRating });
  }
);

export default movieRouter;
