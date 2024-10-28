import api from "../network/api";
import { Film, UpdateData } from "../src/lib/services/types";

// type inputs to apis
type Response<T> = Promise<{ data: T; error: string }>;

export const MovieService = (token?: string) => ({
  getAllMovies: async (): Response<{ movies: Film[] }> => {
    try {
      const response = await api.get("/api/movies", {});
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
  ): Response<{ movie: Film }> => {
    try {
      if (Object.keys(updateData).length === 0) {
        // get movie
        const response = await api.get(`/api/movies/${filmId}`);
        return { data: response.data, error: "" };
      } else {
        // update movie
        const response = await api.post(
          `/api/movies/${filmId}`,
          { updateData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response from post", response.data);
        return { data: response.data, error: "" };
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  refreshMovie: async (filmId: string): Response<{ movie: Film }> => {
    try {
      const response = await api.get(`/api/movies/${filmId}`);
      return { data: response.data, error: "unable to refresh movie" };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
});
