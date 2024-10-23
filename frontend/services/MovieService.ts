import api from "../network/api";
import { Film } from "../src/lib/services/users/types";

// type inputs to apis
type Response<T> = Promise<{ data: T; error: string }>;

export const MovieService = () => ({
  getAllMovies: (): Response<{ movies: Film[] }> => api.get("api/movies"),
});
