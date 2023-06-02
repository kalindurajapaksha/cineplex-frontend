import {
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { MovieDetails } from "../App";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const MovieLayout = () => {
  // const { id } = useParams();

  // const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  // const [isLoading, setIsLoading] = useState(true);

  // const movie = movies.find((m) => m.id === id);
  // useEffect(() => {
  //   const fetchMovieDetails = async (movieId: string) => {
  //     setIsLoading(true);
  //     const res = await fetch(`http://localhost:8080/movie/${movieId}`);
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   };
  //   if (id) {
  //     fetchMovieDetails(id).then((data) => {
  //       setIsLoading(false);
  //       setMovieDetails(data);
  //     });
  //   }
  // }, [id]);
  // if (movieDetails == null) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default MovieLayout;

export const useMovie = () => {
  return useOutletContext<MovieDetails>();
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const movieId = params.id;
  const res = await fetch(`http://localhost:8080/movie/${movieId}`);
  const data = await res.json();
  return { movieDetails: data as MovieDetails };
}
