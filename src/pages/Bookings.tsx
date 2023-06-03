import { useState } from "react";
import { Button, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";
import {
  ActionFunctionArgs,
  redirect,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import jwtDecode from "jwt-decode";
import { TokenData } from "./Authentication";

type Booking = {
  movieImage: string;
  movieName: string;
  seatBookingId: number;
  showTime: string;
};

const Bookings = () => {
  const submit = useSubmit();
  const { bookings } = useLoaderData() as { bookings: Booking[] };
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const cancelBookingHandler = async (seatBookingId: string) => {
    submit({ seatBookingId }, { method: "DELETE" });
    setShowModal(false);
  };
  return (
    <>
      <Row lg={2} xs={1} className="justify-content-center">
        <ListGroup>
          {bookings.map((booking) => {
            return (
              <ListGroup.Item key={booking.seatBookingId}>
                <Row>
                  <Col lg={3}>
                    <Image
                      src={booking.movieImage}
                      rounded
                      style={{ height: "200px" }}
                    />
                  </Col>
                  <Col className="d-flex justify-content-start align-items-center">
                    <div className="m-3">
                      <h4>{booking.movieName}</h4>
                      <p>Showtime: {booking.showTime}</p>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedBooking(booking);
                      }}
                      variant="outline-danger"
                    >
                      Cancel Booking
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
      <ConfirmationModal
        show={showModal}
        setShow={setShowModal}
        selectedBooking={selectedBooking}
        cancelBookingHandler={cancelBookingHandler}
      />
    </>
  );
};

export default Bookings;

export const loader = async () => {
  const token = getAuthToken();
  if (token) {
    const tokenData: TokenData = jwtDecode(token);
    const userId = tokenData.sub.split(",")[0];

    const res = await fetch(
      `http://localhost:8080/seatBooking/getBookedSeats/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    );

    const data = await res.json();

    return { bookings: data };
  }
  return redirect("/");
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = await request.text();
  const token = getAuthToken();
  const res = await fetch(
    "http://localhost:8080/seatBooking/" + data.split("=")[1],
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    }
  );
  return redirect("/bookings");
};

type ConfirmationModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  selectedBooking: Booking | undefined;
  cancelBookingHandler: (id: string) => void;
};

const ConfirmationModal = ({
  show,
  setShow,
  selectedBooking,
  cancelBookingHandler,
}: ConfirmationModalProps) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <h3>Cancel Booking</h3>
      </Modal.Header>
      <Modal.Body>
        {selectedBooking
          ? `Are you sure you want to cancel ${selectedBooking.showTime} booking for movie ${selectedBooking.movieName}?`
          : `Are you sure?`}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (selectedBooking)
              cancelBookingHandler(selectedBooking.seatBookingId.toString());
          }}
          variant="outline-danger"
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
