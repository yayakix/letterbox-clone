import client from "../../../utils/client.ts";
import { IRatingService } from "./interface.ts";

const RatingService = (): IRatingService => ({
  getUserRating: async (filmId: string, userId: string) => {
    const rating = await client.rating.findFirst({
      where: {
        filmId,
        profile: {
          userId,
        },
      },
      select: { value: true },
    });
    return rating?.value || null;
  },
  // cm2s9m7vh0000ijz8r3xqluq9
  // cm2s9m7vh0000ijz8r3xqluq9
  updateRating: async (filmId: string, userId: string, newRating: number) => {
    // Get profile id first
    console.log("update rating step 1", userId);

    const profile = await client.profile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) throw new Error("Profile not found");
    console.log("update rating step 2", profile);
    // Add new rating
    await client.rating.upsert({
      where: { filmId_profileId: { filmId, profileId: profile.id } },
      update: { value: newRating },
      create: { filmId, profileId: profile.id, value: newRating },
    });
    console.log("update rating step 3");

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
      ratings.reduce((sum, rating) => sum + rating.value, 0) +
      film.initialRating;
    const averageRating = totalRatings / (ratings.length + 1);

    // Update film's current rating
    await client.film.update({
      where: { id: filmId },
      data: { currentRating: averageRating },
    });
  },
});

export default RatingService;
