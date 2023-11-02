import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { Row, Button, Col } from "react-bootstrap";



function Eliminar({ token, isOpen, onRequestClose, delete_route, id, confirm_message, onDeleteSuccess }) {
  const [error, setError] = useState(null);

  useEffect(() => {
	setError(null);
  },[isOpen]);

  const handleDelete = async () => {
    try {
      const response = await fetch(delete_route, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
		  "Authorization": "Bearer " + token.token,
        }
      });

      const data = await response.json();
	  if (data.Exito) {
		onDeleteSuccess(id, data.Exito, data.MensajePorFallo);
	  }
	  else {
		setError(data.MensajePorFallo);
	  }

    } catch (error) {
      console.error(error);
      setError("Hubo un error al enviar la solicitud.");
    }
  };

  const handleCancel = () => {
	setError(null);
	onRequestClose();
  }

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header>Eliminar</Modal.Header>
        <Modal.Body>
		  {error && <p className="text-danger">{error}</p>}
             <div>
				<p>{confirm_message}</p>
			  <Row className="mt-4">
				<Col className="text-center">
              		<Button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</Button>
				</Col>
				<Col className="text-center">
              		<Button type="button" onClick={handleDelete} className="btn btn-primary">Confirmar</Button>
				</Col>
			  </Row>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default Eliminar;
