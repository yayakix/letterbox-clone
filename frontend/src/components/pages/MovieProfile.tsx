import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

interface movie {
  id: number;
  title: string;
  posterURL: string;
  director: string;
  releaseYear: number;
  description: string;
  rating: number;
}

interface MovieProfileProps {
  movieId: string
}


const MovieProfile: React.FC<MovieProfileProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

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

    fetchMovie();
  }, [movieId, getToken]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>


  return (
    <div className="flex max-w-4xl mx-auto p-6">
      <div className="flex-shrink-0 mr-6">
        <img
          src={movie.posterURL}
          alt={`${movie.title} movie poster`}
          className="w-56 rounded-lg shadow-md"
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-bold mr-3">{movie.title}</h1>
          <span className="text-xl font-semibold text-yellow-500">{movie.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{movie.releaseYear} Directed by {movie.director}</p>
        <p className="text-base mb-6">
          {movie.description}
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Watch</button>
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded">Like</button>
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded">Comment</button>
        </div>
      </div>
    </div>
  )
};

export default MovieProfile;