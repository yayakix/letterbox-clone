import api from "../network/api";
import { Film, UpdateData } from "../src/lib/services/types";

// type inputs to apis
type Response<T> = Promise<{ data: T; error: string }>;

export const MovieService = (token: string) => ({
  getAllMovies: async (): Response<{ movies: Film[] }> => {
    try {
      const response = await api.get("/api/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  getMovieById: async (id: string): Response<{ movie: Film }> => {
    try {
      const response = await api.get(`/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  getBySearch: async (search: string): Response<{ movies: Film[] }> => {
    try {
      const response = await api.get(
        `/api/movies/search?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  getByFilter: async (filter: string): Response<{ movies: Film[] }> => {
    try {
      const response = await api.get(
        `/api/movies/filter?filter=${encodeURIComponent(filter)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  updateMovie: async (
    filmId: string,
    updateData: UpdateData
  ): Response<{ movies: Film[] }> => {
    try {
      const response = await api.post(`/api/movies/${filmId}`, updateData);
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
});
