import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import YapList from "../base/Comments/Comment";
import { useParams } from "react-router-dom";
import PostComment from "../base/Comments/PostComment";
import Rating from "../base/Rating/Rating";
import { Film, Yap } from "../../lib/services/types";
import useMovieStore from "../../state/movie";
import { MovieService } from "../../../services/MovieService";
import useUserStore from "../../state/user";
import UserService from "../../../services/UserService";

const MovieProfile: React.FC = () => {
  const params = useParams();
  const movieId = params.id;
  if (!movieId) return;
  const { movie, setMovie } = useMovieStore(movieId);
  const { user } = useUserStore();

  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [starRating, setStarRating] = useState<number>(0); // Initialize with a default value of 0
  const [yaps, setYaps] = useState<Yap[]>([]);
  const { getToken } = useAuth();
  // if movie image is not available, use this placeholder
  const url = "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

  useEffect(() => {
    setStarRating(movie?.currentRating ? movie?.currentRating / 2 : 0);
    setYaps(movie?.yaps || []);
    const hasWatched = Boolean(user?.watchedFilms?.[movieId as keyof typeof user.watchedFilms]);
    setIsWatched(hasWatched);
    const hasLiked = Boolean(user?.likedFilms?.[movieId as keyof typeof user.likedFilms]);
    setIsLiked(hasLiked);
  }, [movie]);

  const handleAction = async (action: 'watched' | 'liked') => {
    const token = await getToken();
    const userService = UserService();
    if (action === 'watched' && token) {
      userService.watchMovie(token, movieId);
    }

    if (action === 'liked' && token) {
      userService.likeMovie(token, movieId);
    }

  };

  const fetchComments = async () => {
    if (movieId) {
      const token = await getToken();
      if (token) {
        const movieService = MovieService(token);
        movieService.getMovieById(movieId).then((res) => {
          setMovie(res.data);
        });
      }
    }
  };

  const handleRatingChange = async (newRating: number) => {
    if (movieId) {
      const token = await getToken();
      if (token) {
        const movieService = MovieService(token);
        movieService.updateMovie(movieId, { newRating: (newRating * 2) }).then((res) => {
          setMovie(res.data as Film);
        });
      }
    }

  }
  return (
    <div className="p-6 lg:px-48">
      <div className="flex flex-col lg:flex-row mb-6">
        <div className="flex-shrink-0 lg:mr-6 mb-6 lg:mb-0">
          <img src={movie?.imageUrl || url} alt={movie?.title} className="w-48 mx-auto lg:w-64 h-auto object-cover rounded-lg" />
        </div>
        <div className="flex-grow">
          <h1 className="text-gray-300 text-2xl font-bold mb-2">{movie?.title}</h1>
          <p className="text-sm text-gray-600 mb-2">{movie?.year} • Directed by {movie?.directedBy}</p>
          {movie?.currentRating && (
            <span className="text-xl font-semibold text-yellow-500 flex flex-row items-center gap-2">
              {starRating.toFixed(1)}
              {starRating && <Rating totalStars={5} readOnly={true} readOnlyValue={starRating} />}
            </span>
          )}
          <p className="text-gray-500 mt-4">
            {movie?.description}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Genres: {Array.isArray(movie?.genre) ? movie?.genre.join(', ') : 'Unknown'}
          </p>
        </div>
        <div className="flex-shrink-0 lg:ml-6 mt-6 lg:mt-0 bg-gray-500 p-6 rounded-lg flex flex-col justify-center items-center lg:w-1/6">
          {/* user rating */}
          <div className="flex flex-col items-center relative h-2 w-24">
            <Rating totalStars={5} onRatingChange={handleRatingChange} readOnlyValue={starRating || 0} />
          </div>
          <span className="text-xl font-semibold text-slate-400 mb-1 mt-1">Rate</span>
          <button
            className={`flex flex-col items-center transition-colors mb-4 ${isWatched ? 'text-yellow-500 hover:text-yellow-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            onClick={() => {
              handleAction('watched');
              setIsWatched(!isWatched); // Toggle the watched state
            }}
          >
            <svg
              className="w-8 h-8 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs">{isWatched ? 'Watched' : 'Watch'}</span>
          </button>
          <button
            className={`flex flex-col items-center transition-colors mb-4 ${isLiked ? 'text-green-500 hover:text-green-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            onClick={() => {
              handleAction('liked');
              setIsLiked(!isLiked); // Toggle the liked state
            }}
          >
            <svg
              className="w-8 h-8 mb-1"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs">{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <button className="flex flex-col items-center text-slate-400 hover:text-slate-200 transition-colors">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-xs">Yaps</span>
          </button>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Comments</h2>
        {movie?.id && (
          <PostComment filmId={movie?.id}
            onCommentPosted={fetchComments}
          />
        )}
        <br></br>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>

          {yaps.map((yap) => (
            <YapList key={yap.id} yap={yap} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default MovieProfile;
