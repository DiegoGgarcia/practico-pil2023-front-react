import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="container">
      <h2>Error!</h2>
      <p>Página no disponible</p>
		<Link to="/" className="btn btn-primary">Volver a Inicio</Link>
    </div>
  );
}

export default Error404;