
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Bienvenido a mi aplicación React - Flask API REST</h1>
      <button onClick={() => navigate("/personas")} className="btn btn-info">Personas</button>
    </div>
  );
}

export default Home;
