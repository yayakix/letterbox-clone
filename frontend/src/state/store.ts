import { create } from "zustand";
import { Film } from "../lib/services/users/types";
import { ConnectionUser } from "../lib/services/users/types";
// import { BikeRide } from "../services/BikeService";
// import { User } from "../services/UserService";

type StoreState = {
  user: ConnectionUser | null;
  movies: Film[];
  setMovies: (movies: Film[]) => void;
  setUser: (user: ConnectionUser) => void;
};

const useStore = create<StoreState>((set) => ({
  user: null,
  movies: [],
  setMovies: (movies: Film[]) => set({ movies }),
  setUser: (user: ConnectionUser) => set({ user }),
}));

export default useStore;
