// // src/App.tsx
// import { Routes, Route } from 'react-router-dom';
// import { MovieProvider } from './contexts/MovieContext';
// import { AuthProvider } from './contexts/AuthContext'; // Import the AuthProvider
// import Navbar from './components/Navbar';
// import Favorites from './pages/Favorites';
// import Home from './pages/Home';
// import MoviePage from './components/MoviePage';

// function App() {
//   return (
//     <AuthProvider>
//       <MovieProvider>
//         <Navbar />
//         <main className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/favorites" element={<Favorites />} />

//             <Route path="/movie/:movieId" element={<MoviePage />} />

//           </Routes>
//         </main>
//       </MovieProvider>
//     </AuthProvider>
//   );
// }

// export default App;
// src/App.tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import OutletLayout from "./layouts/OutletLayout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./Login";
import MoviePage from "./components/MoviePage";
import GenrePage from "./pages/GenrePage";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Routes>
      {/* All routes that should show Navbar go inside OutletLayout */}
      <Route path="/" element={<OutletLayout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="genre/:genreId" element={<GenrePage />} />
        <Route path="movie/:movieId" element={<MoviePage />} />
        <Route path="/search" element={<SearchResults />} />

      </Route>

      {/* If login page should NOT have navbar, leave it outside */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
