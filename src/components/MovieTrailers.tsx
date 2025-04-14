import { useEffect, useState } from "react";
import { getTrailersById } from "../services/api";

const MovieTrailers = ({ movieId }: { movieId: string }) => {
  const [trailers, setTrailers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const trailerData = await getTrailersById(movieId);
        setTrailers(trailerData);
      } catch (err) {
        setError("Failed to load trailers.");
        console.error(err);
      }
    };

    fetchTrailers();
  }, [movieId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (trailers.length === 0) {
    return (
      <div className="text-gray-500">No trailers available for this movie.</div>
    );
  }

  return (
    <div className="trailers-container p-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4">Movie Trailers</h2>
      <div className="trailers-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {trailers.slice(0, 2).map((trailer) => (
          <div
            key={trailer.id}
            className="trailer-box bg-black rounded-lg overflow-hidden shadow-md"
          >
            <h3 className="text-white text-lg font-semibold p-4">
              {trailer.name}
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrailers;
