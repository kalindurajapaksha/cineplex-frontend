import { LoaderFunctionArgs, Outlet, useOutletContext } from "react-router-dom";
import { MovieDetails } from "../App";

const MovieLayout = () => {
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
