import client from "../../../utils/client";

// Get user profile
async function updateMovieRating(
  filmId: string,
  userId: string,
  newRating: number
) {
  // First, get the profile ID from the clerk ID
  const user = await client.profile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`User not found with userId: ${userId}`);
  }

  const profileId = user.id;

  // Now proceed with the rating update using the correct profile ID
  await client.rating.upsert({
    where: {
      filmId_profileId: {
        filmId,
        profileId,
      },
    },
    update: {
      value: newRating,
    },
    create: {
      filmId,
      profileId,
      value: newRating,
    },
  });

  // Get film's initial rating
  const film = await client.film.findUnique({
    where: { id: filmId },
    select: { initialRating: true },
  });

  if (!film) throw new Error("Film not found");

  // Calculate new average rating including initial rating
  const ratings = await client.rating.findMany({
    where: { filmId },
    select: { value: true },
  });

  const totalRatings =
    ratings.reduce((sum, rating) => sum + rating.value, 0) + film.initialRating;
  const averageRating = totalRatings / (ratings.length + 1);

  // Update film's current rating
  const updatedFilm = await client.film.update({
    where: { id: filmId },
    data: { currentRating: averageRating },
  });
  return updatedFilm;
}

async function getUserRating(filmId: string, profileId: string) {
  const rating = await client.rating.findUnique({
    where: {
      filmId_profileId: { filmId, profileId },
    },
    select: { value: true },
  });

  return rating?.value || null;
}

const ratingClient = {
  updateMovieRating,
  getUserRating,
};

export default ratingClient;
