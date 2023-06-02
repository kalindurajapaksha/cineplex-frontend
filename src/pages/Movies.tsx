import { Col, Form, Row } from "react-bootstrap";
import { Movie } from "../App";
import MovieCard from "../components/MovieCard";
import { useMemo, useState } from "react";

type MoviesProps = {
  movies: Movie[];
};

const Movies = ({ movies }: MoviesProps) => {
  const [name, setName] = useState<string>("");
  const filteredMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        name === "" || movie.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [movies, name]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Form className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search for Movies"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Row>
      <Row>
        <Col>
          <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredMovies.map((movie) => (
              <Col key={movie.id}>
                {
                  <MovieCard
                    id={movie.id}
                    name={movie.name}
                    image={movie.image}
                  />
                }
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Movies;
