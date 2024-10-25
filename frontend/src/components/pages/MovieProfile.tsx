import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import YapList from "../base/Comments/Comment";
import { useParams } from "react-router-dom";
import PostComment from "../base/Comments/PostComment";
import Rating from "../base/Rating/Rating";
import useMoviesStore from "../../state/movies";
import { Film, Yap } from "../../lib/services/types";
import UserService from "../../../services/UserService";
import useMovieStore from "../../state/movie";
import { MovieService } from "../../../services/MovieService";



const MovieProfile: React.FC = () => {
  const params = useParams();
  const movieId = params.id;
  if (!movieId) return;
  const { movie, setMovie } = useMovieStore(movieId);
  console.log('movie hereeee', movie)

  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [starRating, setStarRating] = useState<number>(0); // Initialize with a default value of 0
  const [yaps, setYaps] = useState<Yap[]>([]);

  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  // if movie image is not available, use this placeholder
  const url = "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

  useEffect(() => {
    setStarRating(movie?.currentRating ? movie?.currentRating / 2 : 0);
    setYaps(movie?.yaps || []);
  }, [movie]);
  // useEffect(() => {
  //   console.log('movieId', movieId)
  // const fetchMovie = async () => {
  //   if (movieId) {
  //     await fetchMovieDetails(movieId);
  //   }
  //   console.log('movies should be here', movies)
  //   const currentMovie = movies.find(movie => movie.id === movieId);
  //   setMovie(currentMovie);
  //   setStarRating(currentMovie?.currentRating ? currentMovie?.currentRating / 2 : 0);
  //   setYaps(currentMovie?.yaps || []);
  // }


  //   const isMovieWatchedOrLiked = async () => {
  //     const token = await getToken();
  //     const response = await fetch(`${process.env.VITE_API_URL}/api/profile/isWatchedOrLiked/${movieId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.isWatched) setIsWatched(true);
  //     if (data.isLiked) setIsLiked(true);
  //   };
  //   isMovieWatchedOrLiked();

  //   fetchMovie();
  // }, [movieId]);
  // Handle liking and watching movies
  // upd


  // const handleAction = async (action: 'watched' | 'liked') => {
  //   try {
  //     const response = await fetch(`${process.env.VITE_API_URL}/api/profile/${action}/${movieId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (!response.ok) throw new Error(`Failed to ${action} movie`);
  //   } catch (error) {
  //     console.error(`Error ${action} movie:`, error);
  //   }
  // };

  const fetchComments = async () => {
    if (movieId) {
      const movieService = MovieService(await getToken());
      movieService.getMovieById(movieId).then((res) => {
        setMovie(res.data);
      });
    }
    console.log('fetching comments')
  };

  // useEffect(() => {
  //   fetchComments();
  // }, [movieId, getToken]);




  // // const handleRatingChange = async (newRating: number) => {
  // //   try {
  // //     const token = await getToken();
  // //     const response = await fetch(`${process.env.VITE_API_URL}/api/movies/rate/${movieId}`, {
  // //       method: 'POST',
  // //       headers: {
  // //         'Authorization': `Bearer ${token}`,
  // //         'Content-Type': 'application/json',
  // //       },
  // //       body: JSON.stringify({ newRating: newRating }),
  // //     });
  // //     if (!response.ok) throw new Error(`Failed to update rating`);
  // //     console.log(`Rating updated successfully`);
  // //     setStarRating((newRating / 2));
  // //   } catch (error) {
  // //     console.error(`Error updating rating:`, error);
  // //   }
  // // };
  // console.log('movie here', movie)
  return (
    <div className=" p-6 lg:px-48">
      <div className="flex mb-6">
        <div className="flex-shrink-0 mr-6">
          <img src={movie?.imageUrl || url} alt={movie?.title} className="w-64 h-auto object-cover rounded-lg" />
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
        <div className="flex-shrink-0 ml-6 bg-gray-500 p-6 rounded-lg flex flex-col justify-center items-center w-1/6">
          {/* user rating */}
          <div className="flex flex-col items-center relative h-2 w-24">
            {/* <Rating totalStars={5} onRatingChange={handleRatingChange} readOnlyValue={starRating || 0} /> */}
          </div>
          <span className="text-xl font-semibold text-slate-400 mb-1 mt-1">Rate</span>
          <button
            className={`flex flex-col items-center transition-colors mb-4 ${isWatched ? 'text-yellow-500 hover:text-yellow-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            onClick={() => {
              // handleAction('watched');
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
              // handleAction('liked');
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
        <PostComment filmId={movie?.id}
          onCommentPosted={fetchComments}
        />
        {yaps.map((yap) => (
          <YapList key={yap.id} yap={yap} />
        ))}
      </div>
    </div>
  )
};

export default MovieProfile;
