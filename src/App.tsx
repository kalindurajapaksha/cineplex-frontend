import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Movies from "./pages/Movies";
import { useEffect, useState } from "react";
import MovieLayout from "./pages/MovieLayout";
import Movie from "./pages/Movie";
import RootLayout from "./pages/RootLayout";
import { loader as movieLoader } from "./pages/MovieLayout";
import Authentication from "./pages/Authentication";
import { action as authAction } from "./pages/Authentication";
import Bookings from "./pages/Bookings";
import { loader as bookingsLoader } from "./pages/Bookings";
import { action as bookingsAction } from "./pages/Bookings";
import { tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import ErrorPage from "./pages/Error";

export type Movie = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type MovieDetails = {
  showtimes: Showtime[];
  availableSeats: number;
} & Movie;

export type Showtime = {
  id: string;
  label: string;
  unavailableSeats: number[];
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFn = async () => {
      const res = await fetch("http://localhost:8080/movie/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    };
    fetchFn().then((data) => setMovies(data));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootLayout />,
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Movies movies={movies} /> },
        { path: "auth", element: <Authentication />, action: authAction },
        {
          path: ":id",
          element: <MovieLayout />,
          children: [{ index: true, element: <Movie />, loader: movieLoader }],
        },
        {
          path: "logout",
          action: logoutAction,
        },
        {
          path: "bookings",
          element: <Bookings />,
          loader: bookingsLoader,
          action: bookingsAction,
        },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ]);

  return (
    <Container className="my-4">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
