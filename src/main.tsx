// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./css/index.css";
// import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// // import { MovieProvider } from "./contexts/MovieContext.tsx";
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );


// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieProvider } from "./contexts/MovieContext"; // ✅ Import your context

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieProvider> {/* ✅ Wrap everything inside MovieProvider */}
          <App />
        </MovieProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

