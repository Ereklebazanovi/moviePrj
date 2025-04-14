import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre, getGenres } from "../services/api";
import MovieCard from "../components/MovieCard";
import { FiAlertCircle, FiFilm, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const GenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();

  // Fetch movies by genre
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["moviesByGenre", genreId],
    queryFn: () => getMoviesByGenre(genreId || ""),
    enabled: !!genreId,
  });

  // Fetch genres to get genre name
  const {
    data: genres = [],
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const genreName =
    genres.find((g) => String(g.id) === genreId)?.name || "Genre";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-indigo-900/50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Genre Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          {isGenresError ? (
            <p className="text-red-400">Failed to load genre name</p>
          ) : isGenresLoading ? (
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <FiLoader className="animate-spin" />
              <span>Loading genre...</span>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {genreName}
              </h2>
              <p className="text-slate-300 text-lg">Step into the world of {genreName} movies</p>
            </>
          )}
        </motion.div>

        {/* Content */}
        {isError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-rose-400"
          >
            <FiAlertCircle className="w-20 h-20 mb-4 animate-pulse" />
            <p className="text-2xl font-bold mb-2">Loading Error</p>
            <p className="text-slate-400">Failed to load movies. Please try again later.</p>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-80 bg-slate-800/50 rounded-2xl animate-pulse overflow-hidden"
              >
                <div className="w-full h-52 bg-slate-700/50"></div>
                <div className="p-4">
                  <div className="h-4 bg-slate-700/50 rounded mb-3 w-3/4"></div>
                  <div className="h-3 bg-slate-700/30 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {movies.length > 0 ? (
              <motion.div
                key="movie-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MovieCard
                      movie={movie}
                      className="relative group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/30 rounded-2xl overflow-hidden
                                transform transition-all duration-500 hover:scale-[1.03] hover:shadow-cinematic"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-slate-300"
              >
                <FiFilm className="w-24 h-24 mb-6 text-cyan-400/50" />
                <p className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  No Movies Found
                </p>
                <p className="text-slate-400 text-lg">This genre appears to be empty</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
