import { useEffect, useState } from "react";
import useStore from "./store";
import { MovieService } from "../../services/MovieService";
import { UpdateData } from "../lib/services/types";
import { useAuth } from "@clerk/clerk-react";

/**
 * Custom hook for managing user state
 *
 * This hook:
 * 1. Initializes user state from the global store
 * 2. Fetches the current user data on component mount using the Clerk token
 * 3. Updates the global store with the fetched user data
 * 4. Returns the user object and loading state for use in components
 */

const useMovieStore = (movieId: string) => {
  const { movie, setMovie, user } = useStore();

  const [movieLoading, setMovieLoading] = useState(true);
  const { getToken } = useAuth();

  // fetch movie details
  console.log("user details here33 ", user);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = await getToken();
        setMovieLoading(true);
        if (token) {
          const movieService = MovieService(token);
          const movieData = await movieService.getMovieById(movieId);
          setMovie(movieData.data);
        } else {
          console.error("Token is required for fetching movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setMovieLoading(false);
      }
    };

    fetchMovies();
  }, []);

  //   posting yaps, updating ratings, etc
  const refreshMovie = async (filmId: string, updateData: UpdateData) => {
    const token = (await getToken()) || undefined;
    const movieService = MovieService(token);
    const movieData = await movieService.refreshMovie(filmId);
    setMovie(movieData.data[0]);
  };

  const updateMovie = async (filmId: string, updateData: UpdateData) => {
    const token = (await getToken()) || undefined;
    const movieService = MovieService(token);
    const movieData = await movieService.updateMovie(filmId, updateData);
    setMovie(movieData.data[0]);
  };

  return {
    user,
    movie,
    setMovie,
    movieLoading,
    updateMovie,
    refreshMovie,
  };
};

export default useMovieStore;
