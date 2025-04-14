import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
} from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import GenreFilter from "./GenreFilter";
import MovieCard from "../components/MovieCard";
import { FiSearch, FiFilm, FiAlertCircle } from "react-icons/fi";

interface Movie {
  id: number;
  title: string;
  genre_ids?: number[];
  overview?: string;
  poster_path?: string;
  release_date?: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  // const { genreName } = useParams();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreName = params.get("genre");
    if (genreName) {
      console.log(`Genre selected from URL: ${genreName}`);
    } else {
      setSelectedGenreId(null);
    }
  }, [location.search]);

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", selectedGenreId],
    queryFn: async () => {
      if (selectedGenreId) return await getMoviesByGenre(selectedGenreId);
      return await getPopularMovies();
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to search movies:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
    setSuggestions([]);
    setSearchQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = window.setTimeout(async () => {
      if (value.trim()) {
        try {
          const results = await searchMovies(value.trim());
          setSuggestions(results.slice(0, 6));
        } catch (err) {
          console.error("Suggestion fetch failed:", err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    setDebounceTimeout(timeout);
  };

  const handleSuggestionClick = (movieId: number) => {
    setSearchQuery("");
    setSuggestions([]);
    navigate(`/movie/${movieId}`);
  };

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenreId(genreId);
    setSearchResults(null);
    navigate("/");
  };

  const displayedMovies = searchResults ?? movies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-zinc-900 to-pink-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-10 relative z-50">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex gap-3">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 
              focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl text-white font-semibold
              hover:from-purple-600 hover:to-indigo-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isSearching ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0..."
                />
              </svg>
            ) : (
              <>
                <FiSearch className="w-5 h-5" />
                Search
              </>
            )}
          </button>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
  <ul className="absolute top-full mt-2 left-0 w-full bg-black/70 backdrop-blur-xl rounded-xl border border-white/10 max-h-96 overflow-y-auto shadow-2xl z-50">
    {suggestions.map((movie) => (
      <li
        key={movie.id}
        onClick={() => handleSuggestionClick(movie.id)}
        className="flex items-center gap-4 p-3 cursor-pointer hover:bg-white/10 transition border-b border-white/5"
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
              : "https://via.placeholder.com/92x138?text=No+Image"
          }
          alt={movie.title}
          className="w-12 h-18 rounded-md object-cover shadow-md"
        />
        <div className="text-white">
          <h4 className="text-sm font-semibold">{movie.title}</h4>
          {movie.release_date && (
            <p className="text-xs text-white/60">{movie.release_date.slice(0, 4)}</p>
          )}
        </div>
      </li>
    ))}
  </ul>
)}

        </form>
      </div>

      <aside className="lg:w-1/5 bg-white/5 rounded-xl p-4 h-fit sticky top-8 backdrop-blur-md shadow-lg mb-6 ml-23 z-40">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Genres</h2>
        <GenreFilter onGenreSelect={handleGenreSelect} />
      </aside>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Movie Grid */}
        <main className="flex-1">
          {isError && (
            <div className="flex flex-col items-center justify-center py-20 text-red-400">
              <FiAlertCircle className="w-16 h-16 mb-4" />
              <p className="text-xl font-medium">
                Failed to load movies. Please try again later.
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4 text-purple-300">
                <svg
                  className="animate-spin h-12 w-12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0..."
                  />
                </svg>
                <p className="text-lg font-medium">Loading Movies...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && displayedMovies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-white/70">
              <FiFilm className="w-20 h-20 mb-4" />
              <p className="text-2xl font-medium">No movies found</p>
              <p className="text-white/50">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
