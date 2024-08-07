import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import YapList from "../base/Comment";
import { useParams } from "react-router-dom";

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  directedBy: string;
  year: number;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  genre: string[];
}

interface Yap {
  id: string;
  yap: string;
  createdAt: Date;
  updatedAt: Date;
  filmId: string;
  profileId: string;
}

const MovieProfile: React.FC = () => {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState<Movie | null>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const url = "https://a.ltrbxd.com/resized/sm/upload/7l/hn/46/uz/zGINvGjdlO6TJRu9wESQvWlOKVT-0-1000-0-1500-crop.jpg?v=8736d1c395"
  const sampleYap: Yap = {
    id: "clziiofpn003m918r1evgclj",
    yap: "Mind-blowing visuals ...",
    createdAt: new Date("2024-08-06T14:29:52.1"),
    updatedAt: new Date("2024-08-06T14:29:52.1"),
    filmId: "clzhhqku000147fatnwla93m",
    profileId: "clziiofp0000m918s8p93rco"
  };

  // Handle liking and watching movies
  const handleAction = async (action: 'watched' | 'liked') => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/profile/${action}/${movieId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.ok) throw new Error(`Failed to ${action} movie`);
      console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} movie successfully`);
    } catch (error) {
      console.error(`Error ${action} movie:`, error);
    }
  };



  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`/api/movies/${movieId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    const isMovieWatchedOrLiked = async () => {
      const token = await getToken();
      const response = await fetch(`/api/profile/isWatchedOrLiked/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isWatched) setIsWatched(true);
      if (data.isLiked) setIsLiked(true);
      console.log('likeorwatchdata', data);
    };
    isMovieWatchedOrLiked();

    fetchMovie();
  }, [movieId, getToken]);

  useEffect(() => {
    if (movie) {
      console.log("Movie data updated:", movie);
    }
  }, [movie]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>


  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex mb-6">
        <div className="flex-shrink-0 mr-6">
          <img src={movie.imageUrl || url} alt={movie.title} className="w-64 h-auto object-cover rounded-lg" />
        </div>
        <div className="flex-grow">
          <h1 className="text-gray-300 text-2xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-600 mb-2">{movie.year} • Directed by {movie.directedBy}</p>
          <span className="text-xl font-semibold text-yellow-500">{movie.rating?.toFixed(1)}</span>
          <p className="text-gray-500 mt-4">
            {movie.description}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Genres: {Array.isArray(movie.genre) ? movie.genre.join(', ') : 'Unknown'}
          </p>
        </div>
        <div className="flex-shrink-0 ml-6 bg-gray-500 p-4 rounded-lg flex flex-col justify-center items-center">
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
        <YapList yap={sampleYap} />
      </div>
    </div>
  )
};

export default MovieProfile;