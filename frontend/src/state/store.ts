import { create } from "zustand";
import { Film } from "../lib/services/types";
import { ConnectionUser } from "../lib/services/types";
// import { BikeRide } from "../services/BikeService";
// import { User } from "../services/UserService";

type StoreState = {
  user: ConnectionUser | null;
  movies: Film[];
  movie: Film | null;
  setMovies: (data: Film[]) => void;
  setMovie: (data: Film | null) => void;
  setUser: (user: ConnectionUser | null) => void;
  updateMovieDetails: (movie: Film) => void;
};

const useStore = create<StoreState>((set, get) => ({
  user: null,
  movies: [],
  movie: null,
  setMovies: (movies: Film[]) => set({ movies }),
  setMovie: (movie: Film | null) => set({ movie }),
  setUser: (user: ConnectionUser | null) => set({ user }),
  updateMovieDetails: (updatedMovie: Film) => {
    const { movies } = get();
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    set({ movies: updatedMovies });
  },
}));

export default useStore;
