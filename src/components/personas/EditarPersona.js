import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { Row, Button, Col } from "react-bootstrap";



function EditarPersona({ token, isOpen, onRequestClose, persona, onEditSuccess }) {
  const [editedPersona, setEditedPersona] = useState({ ...persona });
  const [error, setError] = useState(null);
  const [generos, setGeneros] = useState([]); 

  useEffect(() => {
    setEditedPersona({ ...persona });
	setError(null);
	loadGeneros();
  }, [persona]);

  const loadGeneros = async () => {
    try {
      const response = await fetch("/api/generos", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token.token,
        },
      });

      const data = await response.json();

      if (data.Exito) {
        setGeneros(data.Resultado);
      } else {
        setError(data.MensajePorFallo);
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un error al cargar los géneros.");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch('/api/personas', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
		  "Authorization": "Bearer " + token.token,
        },
        body: JSON.stringify(editedPersona),
      });

      const data = await response.json();
	  if (data.Exito) {
      	onEditSuccess(editedPersona, data.Exito, data.MensajePorFallo);
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
	setEditedPersona({ ...persona });
	onRequestClose();
  }

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header>Editar Persona</Modal.Header>
      <form>
        <Modal.Body>
		  {error && <p className="text-danger">{error}</p>}
             <div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={editedPersona.nombre}
                  onChange={(e) =>
                    setEditedPersona({
                      ...editedPersona,
                      nombre: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={editedPersona.apellido}
                  onChange={(e) =>
                    setEditedPersona({
                      ...editedPersona,
                      apellido: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={editedPersona.email}
                  onChange={(e) =>
                    setEditedPersona({
                      ...editedPersona,
                      email: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </div>
			  <div className="form-group">
              <label>Género</label>
              <select
                value={editedPersona.genero}
                onChange={(e) =>
                  setEditedPersona({
                    ...editedPersona,
                    genero: e.target.value,
                  })
                }
				className="form-control"
              >
                {generos.map((genero) => (
                  <option key={genero.nombre} value={genero.nombre}>
                    {genero.nombre}
                  </option>
                ))}
              </select>
            </div>
			  <Row className="mt-4">
				<Col className="text-center">
              		<Button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</Button>
				</Col>
				<Col className="text-center">
              		<Button type="button" onClick={handleEdit} className="btn btn-primary">Guardar Cambios</Button>
				</Col>
			  </Row>
            </div>
        </Modal.Body>
      </form>
    </Modal>
  )
}

export default EditarPersona;
