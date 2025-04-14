import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface Movie {
  id: number;
  title: string;
  // more fields if needed
}

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovieContext must be used within a MovieProvider");
  return context;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

//new movieContext.tsx

// import {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth, db } from "../firebase"; // adjust path if needed

// interface Movie {
//   id: number;
//   title: string;
//   // add other fields as needed
// }

// interface MovieContextType {
//   favorites: Movie[];
//   addToFavorites: (movie: Movie) => void;
//   removeFromFavorites: (id: number) => void;
//   isFavorite: (id: number) => boolean;
// }

// const MovieContext = createContext<MovieContextType | undefined>(undefined);

// export const useMovieContext = () => {
//   const context = useContext(MovieContext);
//   if (!context)
//     throw new Error("useMovieContext must be used within a MovieProvider");
//   return context;
// };

// export const MovieProvider = ({ children }: { children: ReactNode }) => {
//   const [favorites, setFavorites] = useState<Movie[]>([]);
//   const [user, setUser] = useState<User | null>(null);

//   // Listen for auth changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const favRef = doc(db, "favorites", currentUser.uid);
//         const docSnap = await getDoc(favRef);
//         if (docSnap.exists()) {
//           setFavorites(docSnap.data().movies || []);
//         } else {
//           await setDoc(favRef, { movies: [] });
//         }
//       } else {
//         setFavorites([]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Sync favorites to Firestore when updated
//   useEffect(() => {
//     if (user) {
//       const favRef = doc(db, "favorites", user.uid);
//       setDoc(favRef, { movies: favorites });
//     }
//   }, [favorites, user]);

//   const addToFavorites = (movie: Movie) => {
//     if (!isFavorite(movie.id)) {
//       setFavorites((prev) => [...prev, movie]);
//     }
//   };

//   const removeFromFavorites = (movieId: number) => {
//     setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
//   };

//   const isFavorite = (movieId: number) => {
//     return favorites.some((movie) => movie.id === movieId);
//   };

//   const value: MovieContextType = {
//     favorites,
//     addToFavorites,
//     removeFromFavorites,
//     isFavorite,
//   };

//   return (
//     <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
//   );
// };
