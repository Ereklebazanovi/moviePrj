import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as necessary

interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string | null;
}

interface MovieCardProps {
  movie?: Movie;
  className?: string; // Marked optional for extra safety
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Guard clause: don't render if movie is missing or incomplete
  if (
    !movie ||
    typeof movie.id !== "number" ||
    !movie.title ||
    movie.poster_path === undefined || movie.poster_path === null
  ) {
    return null;
  }

  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Please log in to add movies to your favorites.");
      return;
    }

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster relative group">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/fallback-poster.jpg" // Optional: replace with a real fallback image path
            }
            alt={movie.title}
            className="w-full h-auto"
          />

          {/* Play button overlay */}
          <div className="play-overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="play-button bg-white/90 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
