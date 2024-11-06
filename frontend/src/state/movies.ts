import { useEffect, useState } from "react";
import useStore from "./store";
import { MovieService } from "../../services/MovieService";
import { Film, UpdateData } from "../lib/services/types";
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

const useMoviesStore = () => {
  const { movies, setMovies, updateMovieDetails } = useStore();
  const [moviesLoading, setMoviesLoading] = useState(true);
  const { getToken } = useAuth();

  // fetch movie details

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = await getToken();
        setMoviesLoading(true);
        if (token) {
          const movieService = MovieService(token);
          const moviesData = await movieService.getAllMovies();
          console.log("checking the moviesData here", moviesData.data);
          setMovies(moviesData.data as Film[]);
        } else {
          console.error("Token is required for fetching movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setMoviesLoading(false);
      }
    };

    fetchMovies();
  }, []);

  //   posting yaps, updating ratings, etc
  const updateMovie = async (filmId: string, updateData: UpdateData) => {
    const token = (await getToken()) || undefined;
    const movieService = MovieService(token);
    const moviesData = await movieService.updateMovie(filmId, updateData);
    setMovies(moviesData.data);
  };

  const getBySearch = async (search: string) => {
    const token = (await getToken()) || undefined;
    const movieService = MovieService(token);
    const moviesData = await movieService.getBySearch(search);
    setMovies(moviesData.data);
  };

  const getByFilter = async (filter: string) => {
    const token = (await getToken()) || undefined;
    const movieService = MovieService(token);
    const moviesData = await movieService.getByFilter(filter);
    setMovies(moviesData.data);
  };

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const token = (await getToken()) || undefined;
      if (!token) {
        console.error("Token is required");
        return;
      }
      const movieService = MovieService(token);
      const movieDetails = await movieService.getMovieById(movieId);
      console.log("fetchMovieDetails movieDetails hereeeee", movieDetails.data);
      updateMovieDetails(movieDetails.data as Film);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return {
    movies,
    moviesLoading,
    setMovies,
    updateMovie,
    getBySearch,
    getByFilter,
    fetchMovieDetails,
  };
};

export default useMoviesStore;
