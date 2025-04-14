import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/api";
import { ChevronDown, Film, Loader2, Check } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  className?: string;
  onGenreSelect: (genreId: string) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks

const GenreFilter = ({ onGenreSelect }: Props) => {
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    data: genres = [],
    isLoading,
    isError,
  } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  const toggleGenres = () => {
    setShowGenres((prev) => !prev);
  };

  const handleGenreSelect = (genreId: string, genreName: string) => {
    onGenreSelect(genreId);
    setSelectedGenre(genreName);
    setShowGenres(false);
    navigate(`/genre/${genreId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showGenres && !target.closest("[data-dropdown]")) {
        setShowGenres(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGenres]);

  if (isError)
    return (
      <div className="text-red-400 px-4 py-2 text-sm">
        Failed to load genres
      </div>
    );

  return (
    <div className="relative" data-dropdown>
      <button
        onClick={toggleGenres}
        className="flex items-center space-x-2 bg-gray-800 text-gray-200 z-40 px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
        aria-expanded={showGenres}
        aria-haspopup="listbox"
      >
        <Film size={16} className="text-gray-400" />
        <span className="font-medium text-sm">{selectedGenre || "Genres"}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            showGenres ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isLoading && (
        <div className="absolute z-50 mt-1 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg ">
          <div className="flex items-center justify-center py-4 text-gray-400">
            <Loader2 className="animate-spin mr-2" size={16} />
            <span className="text-sm">Loading genres...</span>
          </div>
        </div>
      )}

      {showGenres && !isLoading && (
        <div className="absolute z-50 mt-1 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg ">
          <div className="py-2 px-3 border-b border-gray-700 ">
            <h3 className="text-xs text-gray-400 font-medium">Select Genre</h3>
          </div>

          <ul className="max-h-60 overflow-y-auto py-1" role="listbox">
            {genres.map((genre) => (
              <li
                key={genre.id}
                role="option"
                aria-selected={selectedGenre === genre.name}
              >
                <button
                  onClick={() =>
                    handleGenreSelect(String(genre.id), genre.name)
                  }
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 flex items-center justify-between
                    ${
                      selectedGenre === genre.name
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  <span>{genre.name}</span>
                  {selectedGenre === genre.name && (
                    <Check size={14} className="text-gray-300" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
