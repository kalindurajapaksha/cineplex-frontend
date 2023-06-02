import { Button, Modal, ToggleButton } from "react-bootstrap";
import { useState } from "react";

type BookingModelProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  setNumberOfSeatsSelected: (num: number) => void;
  setSeatSelectionModelShow: (show: boolean) => void;
  availableSeats?: number;
};

const BookingModel = ({
  show,
  setShow,
  setNumberOfSeatsSelected,
  setSeatSelectionModelShow,
  availableSeats,
}: BookingModelProps) => {
  const [numOfSeats, setNumOfSeats] = useState(0);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Select Number of Seats</Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {Array.from({ length: availableSeats || 10 }, (_, i) => i + 1).map(
          (op) => {
            return (
              <ToggleButton
                type="checkbox"
                variant="outline-primary"
                style={{ width: "40px", aspectRatio: 1, margin: "5px" }}
                key={op}
                value={op}
                checked={op === numOfSeats}
                onClick={() => setNumOfSeats(op)}
              >
                {op}
              </ToggleButton>
            );
          }
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShow(false);
            setNumberOfSeatsSelected(numOfSeats);
            setSeatSelectionModelShow(true);
          }}
        >
          Select Seats
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModel;
