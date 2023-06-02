import { Button, Col, Image, ListGroup, Row, Stack } from "react-bootstrap";
import { useMovie } from "./MovieLayout";
import { useState } from "react";
import BookingModel from "../components/BookingModel";
import { MovieDetails, Showtime } from "../App";
import SeatSelectionModel from "../components/SeatSelectionModel";
import { useLoaderData } from "react-router-dom";

const Movie = () => {
  const { movieDetails } = useLoaderData() as { movieDetails: MovieDetails };
  console.log("🚀 ~ file: Movie.tsx:11 ~ Movie ~ movieDetails:", movieDetails);
  const [selectedTime, setSelectedTime] = useState<Showtime>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [seatSelectionModelShow, setSeatSelectionModelShow] = useState(false);
  const [numberOfSeatsSelected, setNumberOfSeatsSelected] = useState(0);
  return (
    <>
      <Row>
        <Col xl={5} lg={5} sm={6} xs={12}>
          <Image rounded style={{ width: "25vw" }} src={movieDetails.image} />
        </Col>
        <Col>
          <Stack>
            <h1>{movieDetails.name}</h1>
            <div className="mt-4">
              <h5>Synopsis</h5>
              <ListGroup>
                <ListGroup.Item>{movieDetails.description}</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="mt-4">
              <h5>Showtime</h5>
              <ListGroup>
                <Col>
                  {movieDetails &&
                    movieDetails.showtimes.map((showtime) => {
                      return (
                        <Button
                          style={{ width: "100px", marginRight: "10px" }}
                          key={showtime.id}
                          variant="outline-primary"
                          onClick={() => {
                            setSelectedTime(showtime);
                            setShowBookingModal(true);
                          }}
                        >
                          {showtime.label}
                        </Button>
                      );
                    })}
                </Col>
              </ListGroup>
            </div>
          </Stack>
          <BookingModel
            show={showBookingModal}
            setShow={setShowBookingModal}
            setNumberOfSeatsSelected={setNumberOfSeatsSelected}
            setSeatSelectionModelShow={setSeatSelectionModelShow}
            availableSeats={
              selectedTime?.unavailableSeats
                ? movieDetails.availableSeats -
                  selectedTime?.unavailableSeats.length
                : movieDetails.availableSeats
            }
          />
          <SeatSelectionModel
            numberOfSeatsSelected={numberOfSeatsSelected}
            setSeatSelectionModelShow={setSeatSelectionModelShow}
            seatSelectionModelShow={seatSelectionModelShow}
            setBookingModalShow={setShowBookingModal}
            unavailableSeats={selectedTime?.unavailableSeats || []}
            numberOfSeats={movieDetails.availableSeats}
          />
        </Col>
      </Row>
    </>
  );
};

export default Movie;
