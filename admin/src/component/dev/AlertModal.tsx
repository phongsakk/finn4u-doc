import React from "react";
import { Button, Modal } from "react-bootstrap";

export type AlertType = {
  open: boolean;
  close?: () => void;
};

function AlertModal(AlertModal: AlertType) {
  return (
    <Modal
      show={AlertModal.open}
      onHide={() => AlertModal.close?.()}
      className="p-0"
      centered
    >
      <Modal.Header className="bg-success">
        <Button variant="cancel" onClick={() => AlertModal.close?.()} />
      </Modal.Header>
      <Modal.Body>123456</Modal.Body>
    </Modal>
  );
}

export default AlertModal;
