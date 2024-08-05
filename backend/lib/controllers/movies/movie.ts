import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import client from "../../../utils/client.ts";
import optionalUser from "../middleware.ts";

const movieRouter = express.Router();
// const clerkAuth = ClerkExpressRequireAuth();

movieRouter.get("/movies/:id", ClerkExpressRequireAuth(), optionalUser, async (req, res) => {
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