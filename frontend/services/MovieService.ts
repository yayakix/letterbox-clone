import api from "../network/api";
import { Film, UpdateData } from "../src/lib/services/types";

export const MovieService = (token?: string) => ({
  getAllMovies: async (): Promise<{ data: Film[]; error: string }> => {
    try {
      const response = await api.get("/api/movies", {});
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: [], error: (error as Error).message };
    }
  },

  getMovieById: async (
    id: string
  ): Promise<{ data: Film | null; error: string }> => {
    try {
      const response = await api.get(`/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, error: "" };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },

  getBySearch: async (
    search: string
  ): Promise<{ data: Film[]; error: string }> => {
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
      return { data: [], error: (error as Error).message };
    }
  },

  getByFilter: async (
    filter: string
  ): Promise<{ data: Film[]; error: string }> => {
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
      return { data: [], error: (error as Error).message };
    }
  },

  updateMovie: async (
    filmId: string,
    updateData: UpdateData
  ): Promise<{ data: Film | Film[]; error: string }> => {
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
        return { data: response.data as Film, error: "" };
      }
    } catch (error) {
      return { data: [], error: (error as Error).message };
    }
  },
  refreshMovie: async (
    filmId: string
  ): Promise<{ data: Film[]; error: string }> => {
    try {
      const response = await api.get(`/api/movies/${filmId}`);
      return { data: response.data, error: "unable to refresh movie" };
    } catch (error) {
      return { data: [], error: (error as Error).message };
    }
  },
});
