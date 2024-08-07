import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";
import optionalUser from "../middleware.ts";

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
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

movieRouter.get("/:id", ClerkExpressRequireAuth(), optionalUser, async (req, res) => {
    console.log("Request received for movie ID:", req.params.id);
    try {
        const movieId = req.params.id;
        console.log("Attempting to find movie with ID:", movieId);

        const startTime = Date.now();
        const movie = await client.film.findUnique({
            where: { id: movieId },
        });
        const endTime = Date.now();
        console.log(`Database query took ${endTime - startTime}ms`);

        console.log("Database response:", movie);

        if (!movie) {
            console.log("Movie not found in database");
            return res.status(404).json({ error: "Movie not found" });
        }

        console.log("Sending movie data to client");
        res.json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    } finally {
        console.log("Request processing completed");
    }
});

movieRouter.get(`/yaps/:id/`, async (req, res) => {
    console.log("Request received for movie yaps, ID:", req.params.id);
    console.log('hellllooooo')
    try {
        const movieId = req.params.id;
        console.log("Attempting to find yaps for movie with ID:", movieId);

        const yaps = await client.yap.findMany({
            where: { filmId: movieId },
            include: {
                profile: {
                    select: {
                        name: true,
                        imageUrl: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Found ${yaps.length} yaps for movie`);

        res.json(yaps);
    } catch (error) {
        console.error("Error fetching movie yaps:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

export default movieRouter