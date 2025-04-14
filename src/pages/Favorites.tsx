import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const Favorites = () => {
  const { favorites } = useMovieContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component is mounted
    const user = getAuth().currentUser;
    setIsAuthenticated(!!user); // If a user is logged in, set to true, else false
  }, []);

  if (isAuthenticated) {
    if (favorites.length > 0) {
      return (
        <div>
          <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#000000] via-[#fa312793] to-[#48111e] text-transparent bg-clip-text tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] mb-2 leading-tight">
            Your Favorites
          </h1>

          <div className="grid grid-cols-6 grid-rows-4 gap-4 mt-10">
            {favorites.map((movie) => (
              <div key={movie.id} className="max-w-[228px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-screen flex-col">
          <h1>No Favorite Movies Yet</h1>
          <p className="text-red-500">
            Start adding movies to your favorites and they will appear here.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="favorites-empty">
      <h2>Please Log In to Add Favorites</h2>
      <p>To add movies to your favorites, please log in first.</p>
    </div>
  );
};

export default Favorites;
