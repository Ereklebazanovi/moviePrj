import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { FiSearch, FiFilm } from "react-icons/fi";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await searchMovies(searchQuery || "");
        setResults(res);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-gray-900 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Search Results
          </h2>
          <p className="text-lg text-white/70">
            Showing results for:{" "}
            <span className="text-white font-semibold italic">"{searchQuery}"</span>
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FiSearch className="w-12 h-12 text-purple-400 animate-pulse mb-4" />
            <p className="text-lg text-purple-300">Searching for cinematic treasures...</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <FiFilm className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-2xl font-semibold">No cinematic gems found.</p>
            <p className="text-white/50">Try another title or keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
