/// <reference types="vite/client" />
/*
list of endpoints
create base url
create api object
*/

import axios from "axios";

export const EP = {
  user: {
    createUser: "",
    getUser: "",
  },
  movie: {
    getAllMovies: "/api/movies",
    getMovieById: "/api/movies/:id",
    getMoviesBySearch: "/api/movies/search",
    getMoviesByFilter: "/api/movies/filter",
    getMovieRatings: "/api/movies/rate/:id",
    postMovieRating: "/api/movies/rate/:id",
    getMovieComments: "/api/movies/yaps/:id",
    postMovieComment: "/api/movies/yaps/:id",
  },
};

const BaseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
