// File for API calls and data fetching for the movie application project using React and TypeScript. This file contains functions for fetching data from an API and updating the state of the application.

// api.ts
const API_KEY = "a33cf5ae34a8c946c5893dcb8d7d4dd5";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  author: string;
  content: string;
  created_at: string;
}


export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};



export const getMovieDetails = async (movieId: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Fetch reviews for a movie
export const getMovieReviews = async (movieId: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results; // Returns an array of reviews
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`);
  const data = await response.json();
  return data.genres;
};

export const getMoviesByGenre = async (genreId: string): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
  );
  const data = await response.json();
  return data.results;
};

export const getTrailersById = async (movieId: string): Promise<any[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzNjZjVhZTM0YThjOTQ2YzU4OTNkY2I4ZDdkNGRkNSIsIm5iZiI6MTc0Mzc2NDAyNS41NDQ5OTk4LCJzdWIiOiI2N2VmYmEzOWVkZThkODJmM2JhZDE4ZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kWxeAHtdwf9LAxxDfP5ErashAu9HGcTFJSL2ntw3mRo",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trailers");
  }

  const data = await response.json();
  return data.results; // Ensure this is the correct structure
};
