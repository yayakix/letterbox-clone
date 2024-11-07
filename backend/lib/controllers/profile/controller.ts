import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import profileClient from "./profileClient";
import { Request, Response, NextFunction } from "express";
import optionalUser from "../middleware";

interface AuthenticatedRequest extends Request {
  user: { userId: string };
}

const profileRouter = express.Router();
profileRouter.use(ClerkExpressRequireAuth());
profileRouter.use(optionalUser);

// Middleware for checking authorization
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Use authorization middleware
profileRouter.use(requireAuth);

// User Profile
profileRouter.get("/", async (req: Request, res: Response) => {
  try {
    const profile = await profileClient.getProfile(req.user.userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Comments (Yaps)
profileRouter
  .get("/yaps", async (req: Request, res: Response) => {
    try {
      const yaps = await profileClient.getYaps(req.user.userId);
      res.json(yaps);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
  // Post a yap
  .post(
    "/yaps/:filmId",
    async (req: Request<{ filmId: string }>, res: Response) => {
      try {
        const yap = await profileClient.postYap(
          req.user.userId,
          req.body.content.content,
          req.params.filmId
        );
        res.json(yap);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

// Liked Films
profileRouter
  .get("/films/liked", async (req: Request, res: Response) => {
    try {
      const likedFilms = await profileClient.getLikedFilms(req.user.userId);
      res.json(likedFilms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post(
    "/films/liked/:filmId",
    async (req: Request<{ filmId: string }>, res: Response) => {
      try {
        const likedFilm = await profileClient.toggleFilmLike(
          req.user.userId,
          req.params.filmId
        );
        res.json(likedFilm);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

// Network
profileRouter
  .get("/watched", async (req: Request, res: Response) => {
    try {
      const watchedFilms = await profileClient.getWatchedFilms(req.user.userId);
      res.json(watchedFilms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post(
    "/watched/:filmId",
    async (req: Request<{ filmId: string }>, res: Response) => {
      try {
        const watchedFilm = await profileClient.toggleFilmWatched(
          req.user.userId,
          req.params.filmId
        );
        console.log("watched films", watchedFilm);

        res.json(watchedFilm);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  )
  .get("/network/all", async (req: Request, res: Response) => {
    try {
      const profiles = await profileClient.getAllProfiles(req.user.userId);
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .get("/network", async (req: Request, res: Response) => {
    try {
      const following = await profileClient.getFollowing(req.user.userId);
      const followers = await profileClient.getFollowers(req.user.userId);
      res.json({ following, followers });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post(
    "/network/:followingUserId",
    async (req: Request<{ followingUserId: string }>, res: Response) => {
      try {
        console.log("following user", req.params.followingUserId);
        const isFollowing = await profileClient.toggleFollow(
          req.user.userId,
          req.params.followingUserId
        );
        console.log("is following", isFollowing);
        res.json(isFollowing);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

export default profileRouter;
