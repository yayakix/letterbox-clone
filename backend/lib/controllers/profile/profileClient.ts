import client from "../../../utils/client";

// Get user profile
export const getProfile = async (userId: string) => {
  const profile = await client.profile.findUnique({
    where: { userId },
    include: {
      followers: true,
      following: true,
      liked: true,
      watched: true,
    },
  });

  // Transform the watched films into a key-value object
  const watchedFilmsMap =
    profile?.watched?.reduce((acc, film) => {
      acc[film.id] = film;
      return acc;
    }, {} as Record<string, any>) || {};

  // Transform the liked films into a key-value object
  const likedFilmsMap =
    profile?.liked?.reduce((acc, film) => {
      acc[film.id] = film;
      return acc;
    }, {} as Record<string, any>) || {};

  // Transform the data to a more convenient format
  return {
    ...profile,
    likedFilms: likedFilmsMap,
    watchedFilms: watchedFilmsMap,
  };
};
// not being used
// get all profiles
export const getAllProfiles = async (currentUserId: string) => {
  // get profile id
  const profile = await client.profile.findUnique({
    where: {
      userId: currentUserId,
    },
  });
  // get all profiles
  const profiles = await client.profile.findMany({
    where: {
      userId: {
        not: currentUserId,
      },
    },
    include: {
      following: {
        where: {
          followerId: profile?.id,
        },
      },
    },
  });

  return profiles.map((profile) => ({
    ...profile,
    isFollowing: profile.following.length > 0,
  }));
};

// Get users yaps(comments)
export const getYaps = async (userId: string) => {
  const yaps = await client.yap.findMany({
    where: { profile: { userId } },
    include: {
      film: true, // Include the associated movie
      profile: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });
  return yaps;
};
// post a comment
export const postYap = async (
  userId: string,
  content: string,
  filmId: string
) => {
  const yap = await client.yap.create({
    data: {
      yap: content,
      profile: {
        connect: { userId },
      },
      film: {
        connect: { id: filmId },
      },
    },
    include: {
      film: true, // Include the associated movie
    },
  });
  return yap;
};

// Get users liked films
export const getLikedFilms = async (userId: string) => {
  const likedFilms = await client.profile.findUnique({
    where: { userId },
    select: {
      liked: true,
    },
  });

  // Transform the array into a key-value object
  const likedFilmsMap =
    likedFilms?.liked?.reduce((acc, film) => {
      acc[film.id] = film;
      return acc;
    }, {} as Record<string, any>) || {};

  return likedFilmsMap;
};

// Add film to users liked list
export const toggleFilmLike = async (userId: string, filmId: string) => {
  // Check if the film is already liked
  const profile = await client.profile.findUnique({
    where: { userId },
    select: { liked: { where: { id: filmId } } },
  });

  const isLiked = (profile?.liked?.length ?? 0) > 0;

  // Toggle the like status
  const updatedProfile = await client.profile.update({
    where: { userId },
    data: {
      liked: isLiked
        ? { disconnect: { id: filmId } }
        : { connect: { id: filmId } },
    },
    include: { liked: true },
  });

  return {
    profile: updatedProfile,
    action: isLiked ? "unliked" : "liked",
  };
};

// Get users following
export const getFollowing = async (userId: string) => {
  const following = await client.follow.findMany({
    where: { followerId: userId },
    include: { following: true },
  });
  return following.map((f) => f.following);
};

// Get users followers
export const getFollowers = async (userId: string) => {
  const followers = await client.follow.findMany({
    where: { followingId: userId },
    include: { follower: true },
  });
  return followers.map((f) => f.follower);
};

// toggle follow a profile
export const toggleFollow = async (userId: string, followingId: string) => {
  try {
    // Get the actual profile ID from the user ID
    const followerProfile = await client.profile.findUnique({
      where: { userId },
    });

    if (!followerProfile) {
      throw new Error("Follower profile not found");
    }

    // Validate that IDs are different
    if (followerProfile.id === followingId) {
      throw new Error("Cannot follow yourself");
    }

    // Check if the follow relationship already exists
    const existingFollow = await client.follow.findFirst({
      where: {
        AND: [{ followerId: followerProfile.id }, { followingId }],
      },
    });

    if (existingFollow) {
      await client.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return { action: "unfollowed" };
    } else {
      // Verify both profiles exist before creating relationship
      const following = await client.profile.findUnique({
        where: { id: followingId },
      });

      if (!following) {
        throw new Error("Following profile not found");
      }

      await client.follow.create({
        data: {
          followerId: followerProfile.id,
          followingId,
        },
      });
      return { action: "followed" };
    }
  } catch (error) {
    console.error("Toggle follow error:", error);
    throw error;
  }
};

// Check if a profile is following another
export const isFollowing = async (followerId: string, followingId: string) => {
  const follow = await client.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });
  return !!follow;
};

// Get users watched films
export const getWatchedFilms = async (userId: string) => {
  const watchedFilms = await client.profile.findUnique({
    where: { userId },
    select: {
      watched: true,
    },
  });

  // Transform the array into a key-value object
  const watchedFilmsMap =
    watchedFilms?.watched?.reduce((acc, film) => {
      acc[film.id] = film;
      return acc;
    }, {} as Record<string, any>) || {};

  return watchedFilmsMap;
};

// Add film to users watched list
export const toggleFilmWatched = async (userId: string, filmId: string) => {
  // Check if the film is already in the watched list
  const profile = await client.profile.findUnique({
    where: { userId },
    select: { watched: { where: { id: filmId } } },
  });

  const isWatched = (profile?.watched?.length ?? 0) > 0;

  // Toggle the watched status
  const updatedProfile = await client.profile.update({
    where: { userId },
    data: {
      watched: isWatched
        ? { disconnect: { id: filmId } }
        : { connect: { id: filmId } },
    },
    include: { watched: true },
  });

  return {
    profile: updatedProfile,
    action: isWatched ? "removed from watched" : "added to watched",
  };
};

export const isMovieWatchedOrLiked = async (userId: string, filmId: string) => {
  const result = await client.profile.findUnique({
    where: { userId },
    select: {
      watched: {
        where: { id: filmId },
        select: { id: true },
      },
      liked: {
        where: { id: filmId },
        select: { id: true },
      },
    },
  });

  return {
    isWatched: (result?.watched?.length ?? 0) > 0,
    isLiked: (result?.liked?.length ?? 0) > 0,
  };
};

const profileClient = {
  getProfile,
  getAllProfiles,
  getYaps,
  postYap,
  getLikedFilms,
  toggleFilmLike,
  getFollowing,
  getFollowers,
  getWatchedFilms,
  toggleFilmWatched,
  isMovieWatchedOrLiked,
  toggleFollow,
  isFollowing,
};

export default profileClient;
