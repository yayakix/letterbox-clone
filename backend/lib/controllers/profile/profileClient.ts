import client from "../../../utils/client";

// Get user profile
export const getProfile = async (userId: string) => {
  console.log("userId", userId);
  const profile = await client.profile.findUnique({
    where: { userId },
  });
  return profile;
};

// Get users yaps(comments)
export const getYaps = async (userId: string) => {
  const yaps = await client.yap.findMany({
    where: { profile: { userId } },
    include: {
      film: true, // Include the associated movie
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
  return likedFilms?.liked || [];
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

// Get users watched films
export const getWatchedFilms = async (userId: string) => {
  const watchedFilms = await client.profile.findUnique({
    where: { userId },
    select: {
      watched: true,
    },
  });
  return watchedFilms?.watched || [];
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
  getYaps,
  postYap,
  getLikedFilms,
  toggleFilmLike,
  getFollowing,
  getFollowers,
  getWatchedFilms,
  toggleFilmWatched,
  isMovieWatchedOrLiked,
};

export default profileClient;
