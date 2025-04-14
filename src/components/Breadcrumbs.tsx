// src/components/Breadcrumbs.tsx
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [movieTitle, setMovieTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieTitle = async () => {
      const movieIndex = pathnames.findIndex((segment) => segment === "movie");
      const movieId = pathnames[movieIndex + 1];

      if (movieId && location.pathname.includes("/movie/")) {
        try {
          const data = await getMovieDetails(movieId);
          setMovieTitle(data.title);
        } catch (err) {
          setMovieTitle(null);
        }
      }
    };

    fetchMovieTitle();
  }, [location.pathname]);

  return (
    <nav className="text-sm text-gray-500 mb-6">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="hover:text-indigo-600">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          let name = value;
          if (value === "movie" && movieTitle) return null; // skip the "movie" segment, we’ll show the title next
          if (index > 0 && pathnames[index - 1] === "movie" && movieTitle) {
            name = movieTitle;
          } else {
            name =
              value === "genre"
                ? "Genre"
                : value === "favorites"
                ? "Favorites"
                : decodeURIComponent(value);
          }

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">{name}</span>
              ) : (
                <Link to={to} className="hover:text-indigo-600">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
