import client from "../../../utils/client.ts";
import { IFilmService } from "./interface.ts";

const MovieService = (): IFilmService => ({
  getAllFilms: async () => {
    const films = await client.film.findMany();
    return films;
  },
  getFilmById: async (id: string) => {
    const film = await client.film.findUnique({
      where: { id },
    });
    if (!film) throw new Error(`Film with id ${id} not found`);
    return film;
  },
});

export default MovieService;
