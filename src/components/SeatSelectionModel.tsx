import { Button, Col, Modal, Row, Stack, ToggleButton } from "react-bootstrap";
import classes from "./SeatSelectionModel.module.css";
import { useState } from "react";

type SeatSelectionModelProps = {
  numberOfSeatsSelected: number;
  setSeatSelectionModelShow: (show: boolean) => void;
  seatSelectionModelShow: boolean;
  setBookingModalShow: (show: boolean) => void;
  unavailableSeats: number[];
  numberOfSeats: number;
};

const SeatSelectionModel = ({
  numberOfSeatsSelected,
  seatSelectionModelShow,
  setSeatSelectionModelShow,
  setBookingModalShow,
  unavailableSeats,
  numberOfSeats,
}: SeatSelectionModelProps) => {
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
        <Button>Proceed</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SeatSelectionModel;
