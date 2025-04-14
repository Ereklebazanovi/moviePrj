"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails } from "../services/api"
import { Star, Clock, Calendar, Film, User, Play } from "lucide-react"
import MovieTrailers from "./MovieTrailers"
import OpenModal from "./OpenModal"
import OpenReviewsModal from "./OpenReviewsModal"
import RateModal from "./RateModal"
import Breadcrumbs from "./Breadcrumbs"
const MoviePage = () => {
  const { movieId } = useParams()
  interface Movie {
    id: number
    title: string
    overview: string
    release_date?: string
    runtime: number
    vote_average: number
    genres: { id: number; name: string }[]
    backdrop_path?: string
    poster_path?: string
    credits?: {
      cast: {
        id: number
        name: string
        character: string
        profile_path?: string
      }[]
    }
  }

  const [movie, setMovie] = useState<Movie | null>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [showTrailers, setShowTrailers] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true)
      try {
        if (movieId) {
          const details = await getMovieDetails(movieId)
          setMovie(details)
        }
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 border border-red-500/20 rounded-xl p-8 text-center shadow-2xl shadow-red-500/10">
          <div className="text-red-400 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-700/30 hover:shadow-red-700/50"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 px-4 py-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-800 rounded-lg w-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20">
            <div className="col-span-1 bg-gray-700 h-[600px]"></div>
            <div className="col-span-2 p-10 bg-gray-800">
              <div className="h-12 bg-gray-700 rounded-lg mb-6 w-3/4"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-6 bg-gray-700 rounded-full w-24"></div>
                <div className="h-6 bg-gray-700 rounded-full w-24"></div>
                <div className="h-6 bg-gray-700 rounded-full w-24"></div>
              </div>
              <div className="flex gap-2 mb-8">
                <div className="h-8 bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-700 rounded-full w-20"></div>
              </div>
              <div className="h-6 bg-gray-700 rounded-lg mb-4 w-1/4"></div>
              <div className="h-4 bg-gray-700 rounded-md mb-2 w-full"></div>
              <div className="h-4 bg-gray-700 rounded-md mb-2 w-full"></div>
              <div className="h-4 bg-gray-700 rounded-md mb-8 w-5/6"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-4 w-1/4"></div>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded-md w-full mb-1"></div>
                    <div className="h-3 bg-gray-700 rounded-md w-3/4"></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <div className="h-12 bg-gray-700 rounded-lg w-40"></div>
                <div className="h-12 bg-gray-700 rounded-lg w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Full-page background with movie backdrop */}
      {movie.backdrop_path && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 blur-sm"
            />

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

          {/* Radial glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>

          {/* Animated particles effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.1)_0%,transparent_70%)] animate-pulse"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8 text-gray-300/80">
            <Breadcrumbs />
          </div>

          {/* Main content card with beautiful shadow effects */}
          <div className="relative">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-500/20 to-purple-600/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

            {/* Card content */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-0 bg-gray-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(120,50,255,0.3)]">
              {/* Poster column */}
              <div className="col-span-1 bg-gray-900/50 relative overflow-hidden">
                {/* Poster image with effects */}
                <div className="h-[500px] lg:h-full w-full flex items-center justify-center overflow-hidden relative group">
                  {movie.poster_path ? (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

                      {/* Play button overlay */}
                      <button
                        onClick={() => setShowTrailers(true)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-20 h-20 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.7)] transform transition-transform duration-300 group-hover:scale-110">
                          <Play size={36} className="text-white ml-1" fill="white" />
                        </div>
                      </button>

                      {/* Subtle light reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Film size={80} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Bottom gradient for poster */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>

              {/* Details column */}
              <div className="col-span-2 p-6 sm:p-8 lg:p-10 bg-gray-900/60 backdrop-blur-xl relative">
                {/* Subtle animated light effect */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                {/* Title and action buttons */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 relative">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight drop-shadow-md">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap gap-2">
                    <OpenReviewsModal movieId={movie.id.toString()} />
                    <OpenModal
                      movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      movieName={movie.title}
                    />
                  </div>
                </div>

                {/* Movie metadata */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-sm sm:text-base">
                  {movie.release_date && (
                    <div className="flex items-center text-gray-300 group">
                      <Calendar
                        size={18}
                        className="mr-2 text-purple-400 group-hover:text-purple-300 transition-colors"
                      />
                      <span className="group-hover:text-white transition-colors">{formatDate(movie.release_date)}</span>
                    </div>
                  )}

                  {movie.runtime && (
                    <div className="flex items-center text-gray-300 group">
                      <Clock size={18} className="mr-2 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <span className="group-hover:text-white transition-colors">{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}

                  {movie.vote_average && (
                    <div className="flex items-center">
                      <div className="flex items-center text-amber-400 group">
                        <Star
                          size={18}
                          className="mr-2 fill-amber-400 text-amber-400 group-hover:fill-amber-300 group-hover:text-amber-300 transition-colors"
                        />
                        <span className="font-medium group-hover:text-amber-300 transition-colors">
                          {movie.vote_average.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="ml-4">
                        <RateModal />
                      </div>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-4 py-1.5 bg-gray-800/80 text-gray-200 text-sm font-medium rounded-full border border-purple-500/20 transition-all hover:bg-purple-900/40 hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview */}
                <div className="mb-10 relative">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="inline-block w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 mr-3 rounded-full"></span>
                    Overview
                  </h2>
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {movie.overview || "No overview available."}
                  </p>

                  {/* Subtle highlight for text */}
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent rounded-full blur-sm"></div>
                </div>

                {/* Cast */}
                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                  <div className="mb-10 relative">
                    <h2 className="text-xl font-semibold text-white mb-5 flex items-center">
                      <span className="inline-block w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 mr-3 rounded-full"></span>
                      Top Cast
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {movie.credits.cast.slice(0, 4).map((person) => (
                        <div key={person.id} className="flex flex-col items-center text-center group">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] group-hover:scale-105">
                            {/* Glow effect for cast images */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                              {person.profile_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                  alt={person.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                  <User size={30} className="text-gray-500" />
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                            {person.name}
                          </span>
                          <span className="text-xs text-gray-400 italic group-hover:text-gray-300 transition-colors">
                            {person.character}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="relative px-6 py-3 bg-gray-800 text-white rounded-lg overflow-hidden group"
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-gray-700/50"></div>
                    <div className="absolute -inset-px bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>

                    <span className="relative flex items-center justify-center">
                      <span className="mr-2">←</span> Back to Movies
                    </span>
                  </button>

                  <button
                    onClick={() => setShowTrailers(!showTrailers)}
                    className="relative px-6 py-3 bg-purple-700 text-white rounded-lg overflow-hidden group"
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-purple-600/50"></div>
                    <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>

                    <span className="relative flex items-center justify-center">
                      {showTrailers ? "Hide Trailers" : "Watch Trailers"}{" "}
                      {!showTrailers && <Play size={16} className="ml-2" />}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailers && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-gray-900/90 rounded-xl overflow-hidden border border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.4)]">
            {/* Modal glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-500/20 to-purple-600/30 rounded-xl blur-xl opacity-70 animate-pulse"></div>

            <button
              onClick={() => setShowTrailers(false)}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 z-10 shadow-lg shadow-red-700/30 flex items-center"
            >
              Close
            </button>
            <div className="relative p-4 pt-16 pb-8">
            <MovieTrailers movieId={movie.id.toString()} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePage
