import client from "../../../utils/client.ts";
import { IFilmService } from "./interface.ts";

const MovieService = (): IFilmService => ({
  getAllFilms: async () => {
    const films = await client.film.findMany();
    return films;
  },
  getFilmById: async (filmId: string, userId: string) => {
    const startTime = Date.now();
    const film = await client.film.findUnique({
      where: { id: filmId },
      include: {
        ratings: {
          where: { profileId: userId },
          select: { value: true },
        },
      },
    });
    if (!film) throw new Error(`Film with id ${filmId} not found`);
    return film;
  },
  getYapsOnFilm: async (filmId: string, userId: string) => {
    const yaps = await client.yap.findMany({
      where: { filmId },
      include: {
        profile: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return yaps.map((yap) => ({
      ...yap,
      profile: {
        ...yap.profile,
        imageUrl: yap.profile.imageUrl || "",
      },
    }));
  },
});

export default MovieService;
