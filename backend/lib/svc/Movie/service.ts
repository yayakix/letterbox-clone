import client from "../../../utils/client.ts";
import { IFilmService } from "./interface.ts";

const MovieService = (): IFilmService => ({
  getAllFilms: async () => {
    const films = await client.film.findMany();
    return films;
  },
  getFilmById: async (filmId: string, userId: string) => {
    const film = await client.film.findUnique({
      where: { id: filmId },
      include: {
        ratings: {
          where: { profileId: userId },
          select: { value: true },
        },
        yaps: {
          include: {
            profile: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!film) throw new Error(`Film with id ${filmId} not found`);
    return film;
  },
  updateFilm: async (
    filmId: string,
    userId: string,
    updateData: { yapContent?: string; ratingValue?: number }
  ) => {
    const { yapContent, ratingValue } = updateData;

    const updateOperations: any = {};

    if (yapContent !== undefined) {
      updateOperations.yaps = {
        upsert: {
          where: { filmId_userId: { filmId, userId } },
          update: { content: yapContent },
          create: {
            content: yapContent,
            profile: {
              connect: { id: userId },
            },
          },
        },
      };
    }

    if (ratingValue !== undefined) {
      updateOperations.ratings = {
        upsert: {
          where: { filmId_userId: { filmId, userId } },
          update: { value: ratingValue },
          create: {
            value: ratingValue,
            profile: {
              connect: { id: userId },
            },
          },
        },
      };
    }

    const updatedFilm = await client.film.update({
      where: { id: filmId },
      data: updateOperations,
    });

    return updatedFilm;
  },
});

export default MovieService;
