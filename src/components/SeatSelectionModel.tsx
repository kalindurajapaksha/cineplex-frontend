import { Button, Modal, Row, ToggleButton } from "react-bootstrap";
import classes from "./SeatSelectionModel.module.css";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { getAuthToken } from "../util/auth";
import { TokenData } from "../pages/Authentication";
import { redirect } from "react-router-dom";

type SeatSelectionModelProps = {
  numberOfSeatsSelected: number;
  setSeatSelectionModelShow: (show: boolean) => void;
  seatSelectionModelShow: boolean;
  setBookingModalShow: (show: boolean) => void;
  unavailableSeats: number[];
  numberOfSeats: number;
  movieShowtimeId: number | undefined;
};

const SeatSelectionModel = ({
  numberOfSeatsSelected,
  seatSelectionModelShow,
  setSeatSelectionModelShow,
  setBookingModalShow,
  unavailableSeats,
  numberOfSeats,
  movieShowtimeId,
}: SeatSelectionModelProps) => {
  const token = getAuthToken();

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const remainingNumOfSeats = numberOfSeatsSelected - selectedSeats.length;

  const seatSelectionHandler = (seatNumber: number) => {
    if (remainingNumOfSeats > 0) {
      for (
        let i = seatNumber;
        i < Math.min(numberOfSeats + 1, remainingNumOfSeats + seatNumber);
        i++
      ) {
        if (unavailableSeats.includes(i)) break;
        if (!unavailableSeats.includes(i) && !selectedSeats.includes(i)) {
          setSelectedSeats((prev) => {
            return [...prev, i];
          });
        }
      }
    } else {
      setSelectedSeats([]);
    }
  };

  const onProceedHandler = async () => {
    let userId;
    if (token) {
      const tokenData: TokenData = jwtDecode(token);
      userId = tokenData.sub.split(",")[0];
    }
    const body = {
      movieShowtimeId,
      userId: Number(userId),
      seatIds: selectedSeats,
    };
    const res = await fetch("http://localhost:8080/seatBooking/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(body),
    });
    setSeatSelectionModelShow(false);
    return redirect("/");
  };

  return (
    <Modal
      size="xl"
      show={seatSelectionModelShow}
      onHide={() => {
        setSelectedSeats([]);
        setSeatSelectionModelShow(false);
      }}
    >
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Modal.Title>All eyes this way please!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((seat) => {
            return (
              <ToggleButton
                value={seat}
                type="checkbox"
                variant="outline-primary"
                key={seat}
                style={{
                  width: "40px",
                  aspectRatio: 1,
                  margin: "5px",
                }}
                className={classes.btn}
                disabled={unavailableSeats.includes(seat)}
                onClick={() => seatSelectionHandler(seat)}
                checked={selectedSeats.some((selected) => seat === selected)}
              >
                {seat}
              </ToggleButton>
            );
          })}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setSelectedSeats([]);
            setSeatSelectionModelShow(false);
            setBookingModalShow(true);
          }}
          variant="outline-secondary"
        >
          Back
        </Button>
        <Button onClick={onProceedHandler}>Proceed</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SeatSelectionModel;
