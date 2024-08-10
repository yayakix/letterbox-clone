import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";
import optionalUser from "../middleware.ts";
import ratingClient from "../ratings/ratingClient.ts";
import profileClient from "../profile/profileClient.ts";
import MovieService from "../../svc/Movie/service.ts";
import RatingService from "../../svc/Rating/service.ts";

const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  try {
    const movies = await MovieService().getAllFilms();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

movieRouter.get(
  "/search",
  async (req, res) => {
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
  }
);

movieRouter.get(
  "/filter",
  async (req, res) => {
    const type = req.query.type;
    const filter = req.query.filter;

    if (type === "genre") {
      try {
        if (filter === "All") {
          const movies = await client.film.findMany();
          res.status(200).json(movies);
        } else {
          const movies = await client.film.findMany({
            where: { genre: { has: filter as string } },
          });
          res.status(200).json(movies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        res
          .status(500)
          .json({ error: "Internal server error", details: error.message });
      }
    } else if (type === "year") {
      try {
        if (filter === "All") {
          const movies = await client.film.findMany();
          res.status(200).json(movies);
        } else {
          const movies = await client.film.findMany({
            where: {
              year: {
                gte: parseInt(filter as string), // Year is greater than or equal to the input year
                lte: parseInt(filter as string) + 10, // Year is less than or equal to the input year + 10
              },
            },
          });
          res.status(200).json(movies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        res
          .status(500)
          .json({ error: "Internal server error", details: error.message });
      }
    }
    if (type === "rating" && filter === "Highest Rated") {
      try {
        const movies = await client.film.findMany({
          where: {
            currentRating: {
              gte: 8,
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
    }
    if (type === "rating" && filter === "Lowest Rated") {
      try {
        const movies = await client.film.findMany({
          where: {
            currentRating: {
              lte: 5,
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
    }
    if (type === "rating" && filter === "All") {
      const movies = await client.film.findMany();
      res.status(200).json(movies);
    }
  }
);

movieRouter.get(
  "/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await MovieService().getFilmById(movieId, req.user.userId);

      if (!movie) {
        console.log("Movie not found in database");
        return res.status(404).json({ error: "Movie not found" });
      }
      const profile = await profileClient.getProfile(req.user.userId);

      const userRating = await ratingClient.getUserRating(
        movie.id,
        profile.id as string
      );
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

// Get yaps on a film
movieRouter.get(
  `/yaps/:id/`,
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    try {
      const movieId = req.params.id;
      const yaps = await MovieService().getYapsOnFilm(movieId, req.user.userId);
      res.json(yaps);
    } catch (error) {
      console.error("Error fetching movie yaps:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

// Get user rating on a film
movieRouter.get(
  "/rate/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const profile = await profileClient.getProfile(req.user.userId);
    const filmId = req.params.id;
    const profileId = profile.id;
    const userRating = await RatingService().getUserRating(
      filmId,
      profileId as string
    );
    res.json({ userRating });
  }
);

movieRouter.post(
  "/rate/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const filmId = req.params.id;
    const profile = await profileClient.getProfile(req.user.userId);
    if (!profile.id) {
      return res.status(404).json({ error: "Profile id not found" });
    }
    const profileId = profile.id;
    const newRating = req.body.newRating;
    await RatingService().updateRating(filmId, profileId, newRating);
    const userRating = await RatingService().getUserRating(filmId, profileId);
    res.json({ message: "Movie rating updated successfully", userRating });
  }
);

export default movieRouter;
