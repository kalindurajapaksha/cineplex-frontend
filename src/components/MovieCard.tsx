import { Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  id: string;
  name: string;
  image: string;
};

const MovieCard = ({ id, name, image }: MovieCardProps) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Img
        variant="top"
        src={image}
        height="500px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5 text-truncate" style={{ maxWidth: "250px" }}>
            {name}
          </span>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
