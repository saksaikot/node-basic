import React from "react";

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Summery from "./Summery";

export default function OrderModal({
  modalOpen,
  ingredients,
  handelToggleModel,
  totalPrice,
  handleCheckoutButton,
}) {
  return (
    <div>
      <Modal isOpen={modalOpen}>
        <ModalHeader>Order summery</ModalHeader>
        <ModalBody>
          <h6>Total Price {totalPrice}</h6>

          <Summery ingredients={ingredients}></Summery>
        </ModalBody>
        <ModalFooter>
          <Button
            className="primary-accent"
            onClick={() => handleCheckoutButton()}
            color="success"
          >
            Continue to checkout
          </Button>
          <Button onClick={() => handelToggleModel()} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
