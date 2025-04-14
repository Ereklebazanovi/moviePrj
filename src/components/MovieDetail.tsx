import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieReviews } from "../services/api"; // Import the API functions
import { Movie } from "../services/api";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext to check if user is logged in

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<any[]>([]); // This will hold the reviews
  const [error, setError] = useState<string | null>(null); // Track errors
  const { user } = useAuth(); // Assuming you have a context to check if the user is logged in

  // Fetch movie details and reviews on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Reset error state
        const movieData = await getMovieDetails(id!);
        setMovie(movieData);

        const reviewsData = await getMovieReviews(id!);
        setReviews(reviewsData.results || []); // Ensure reviews are properly set
      } catch (err) {
        console.error("Error fetching movie details or reviews:", err);
        setError("Failed to load movie details or reviews. Please try again.");
      }
    };

    fetchData();
  }, [id]);

  // Render movie details and reviews
  return (
    <div className="movie-detail">
      {error && <p className="error-message">{error}</p>}

      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>

          <div className="reviews-section">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review">
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet. Be the first to add one!</p>
            )}

            {/* Add Review Form */}
            {user && (
              <div className="add-review">
                <textarea placeholder="Add your review here..."></textarea>
                <button>Add Review</button>
              </div>
            )}
            {!user && <p>Please log in to add a review.</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;