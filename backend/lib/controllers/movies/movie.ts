import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";
import optionalUser from "../middleware.ts";
import ratingClient from "../ratings/ratingClient.ts";
import profileClient from "../profile/profileClient.ts";
import MovieService from "../../svc/Movie/service.ts";
import RatingService from "../../svc/Rating/service.ts";

const movieRouter = express.Router();

// Define an interface for updateData
interface UpdateData {
  newRating?: number;
  yaps?: string;
  // Add other properties as needed
}
// good
movieRouter.get("/", async (_req, res) => {
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

// Get a single movie
// Get a single movie along with yaps and user rating
movieRouter.get(
  "/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    try {
      const movieId = req.params.id;

      // Fetch the movie details
      const movie = await MovieService().getFilmById(movieId, req.user.userId);

      if (!movie) {
        console.error("Movie not found in database");
        return res.status(404).json({ error: "Movie not found" });
      }

      // Fetch the user's profile
      const profile = await profileClient.getProfile(req.user.userId);

      // Fetch user rating for the movie
      const userRating = await ratingClient.getUserRating(
        movie.id,
        profile.id as string
      );

      // Fetch yaps (comments) related to the movie
      // const yaps = await MovieService().getYapsOnFilm(movieId, req.user.userId);

      // Combine all data into a single response object
      const movieWithDetails = {
        ...movie,
        userRating,
        // yaps, // Include yaps in the response
      };

      res.json(movieWithDetails);
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

movieRouter.get("/search", async (req, res) => {
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

// Filter movies
movieRouter.get("/filter", async (req, res) => {
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
});

// Update film
movieRouter.patch(
  "/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    const filmId = req.params.id;
    const profile = await profileClient.getProfile(req.user.userId);
    if (!profile.id) {
      return res.status(404).json({ error: "Profile id not found" });
    }
    const userId = req.user.userId;
    // Cast req.body to UpdateData
    const updateData: UpdateData = req.body;

    try {
      // Filter out any undefined values to avoid sending invalid data
      const filteredData: Partial<UpdateData> = Object.keys(updateData).reduce(
        (acc, key) => {
          if (updateData[key] !== undefined) {
            acc[key] = updateData[key];
          }
          return acc;
        },
        {} as Partial<UpdateData>
      );

      // Update the film with the filtered data
      if (filteredData.newRating !== undefined) {
        await RatingService().updateRating(
          filmId,
          userId,
          filteredData.newRating
        );
      }

      // Get the updated user rating
      const userRating = await RatingService().getUserRating(filmId, userId);
      res.json({ message: "Movie updated successfully", userRating });
    } catch (error) {
      console.error("Error updating movie:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);
type UpdatedFilm = Awaited<
  ReturnType<typeof ratingClient.updateMovieRating>
> | null;

// Update film
movieRouter.post(
  "/:id",
  ClerkExpressRequireAuth(),
  optionalUser,
  async (req, res) => {
    try {
      const filmId = req.params.id;
      const updateData: UpdateData = req.body.updateData;
      let updatedFilm: UpdatedFilm = null;

      console.log("update data", updateData);
      if (updateData.newRating !== undefined) {
        updatedFilm = await ratingClient.updateMovieRating(
          filmId,
          req.user?.userId,
          updateData.newRating
        );
        console.log("movie updated successfully", updatedFilm);
      }

      if (!updatedFilm) {
        return res.status(400).json({ error: "No updates were performed" });
      }

      res.json(updatedFilm);
    } catch (error) {
      console.error("Error updating movie:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

export default movieRouter;

/*
 example format to use for updating dynamically
 filmRouter.patch("/films/:filmId", async (req, res) => {
  const { filmId } = req.params;
  const updateData = req.body;

  try {
    // Filter out any undefined values to avoid sending invalid data to Prisma
    const filteredData = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    // Update the film with the filtered data
    const updatedFilm = await prisma.film.update({
      where: { id: filmId },
      data: filteredData,
    });

    res.json(updatedFilm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

*/
