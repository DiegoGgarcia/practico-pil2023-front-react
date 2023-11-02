import React, { useState, useEffect, useRef } from "react";
import EditarPersona from "./EditarPersona";
import Eliminar from "../comun/Eliminar";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "react-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";

function Personas(token) {
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable({
      data: tableData,
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "apellido" },
        { data: "email" },
        { data: "edad" },
        { data: "genero" },
        {
          data: null,
          width: "1%",
          sortable: false,
          render: function (data, type, row) {
            return '<button class="btn btn-primary editar-button" data-id="' + data.id + '"><i class="fa-regular fa-pen-to-square"></i></button>';
          },
        },
        {
          data: null,
          width: "1%",
          sortable: false,
          render: function (data, type, row) {
            return '<button class="btn btn-danger borrar-button" data-id="' + data.id + '"><i class="fa-regular fa-trash-can"></i></button>';
            
          },
        },
      ],
    });

    $(tableRef.current).on("click", ".editar-button", function (e) {
      e.preventDefault();
      const persona = tableData.find((item) => item.id === $(this).data("id"));
      setPersonaSeleccionada(persona);
      setEditModalOpen(true);
    });

    $(tableRef.current).on("click", ".borrar-button", function (e) {
      e.preventDefault();
      const persona = tableData.find((item) => item.id === $(this).data("id"));
      setPersonaSeleccionada(persona);
      setDeleteModalOpen(true);
    });
    return () => {
      dataTable.destroy();
    };
  }, [tableData]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [personal_id, setPersonal_id] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/personas/obtener', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.token,
        },
        body: JSON.stringify({ nombre, apellido, email, personal_id }),
      });

      const data = await response.json();

      if (data.Exito) {
        setTableData(data.Resultado);
      } else {
        setError(data.MensajePorFallo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSuccess = (editedPersona, exito, mensaje) => {
    setTableData((prevTableData) => {
      const updatedTableData = prevTableData.map((item) => {
        if (item.id === editedPersona.id) {
          return editedPersona;
        }
        return item;
      });
      return updatedTableData;
    });
    setEditModalOpen(false);
    exito ? alert("Cambios guardados con éxito.") : alert(mensaje);
  };

  const handleDeleteSuccess = (id, exito, mensaje) => {
    setTableData((prevTableData) => {
      const updatedTableData = prevTableData.filter((item) => item.id !== id);
      return updatedTableData;
    });
    setDeleteModalOpen(false);
    exito ? alert("Persona eliminada.") : alert(mensaje);
  };

  const handleCancel = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <Container className="p-2">
      <h2 className="text-center">Personas</h2>
      {personaSeleccionada && (
      <EditarPersona
        token={token}
        isOpen={editModalOpen}
        onRequestClose={handleCancel}
        persona={personaSeleccionada}
        onEditSuccess={handleEditSuccess}
      />)}

      {personaSeleccionada && (
      <Eliminar
        token={token}
        isOpen={deleteModalOpen}
        onRequestClose={handleCancel}
        id={personaSeleccionada.id}
        delete_route={`/api/personas/${personaSeleccionada.id}`}
        confirm_message={`¿Estás seguro de que deseas eliminar a ${personaSeleccionada.nombre} ${personaSeleccionada.apellido} ?`}
        onDeleteSuccess={handleDeleteSuccess}
      />)}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control mt-2"
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="form-control mt-2"
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-2"
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="DNI"
              value={personal_id}
              onChange={(e) => setPersonal_id(e.target.value)}
              className="form-control mt-2"
            />
          </Col>
          <Col>
            <Button type="submit" className="btn btn-primary mt-2">
              Buscar
            </Button>
          </Col>
        </Row>
      </form>
      <div className="mt-3">
        <table className="table" ref={tableRef}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Edad</th>
              <th scope="col">Genero</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Personas;
