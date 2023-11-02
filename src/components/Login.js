import React, { useState } from "react";
import Modal from "react-modal"; // Importa react-modal
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";

Modal.setAppElement("#root"); // Debes especificar el elemento raíz de tu aplicación

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.access_token) {
        onLogin(data.access_token);
        navigate("/");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Card className="col-2">
      <CardHeader>
        <h2>Login</h2>
      </CardHeader>
        <form onSubmit={handleSubmit}>
      <CardBody>
        {error && <p className="text-danger">{error}</p>}
  
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-2"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-2"
            />
        </CardBody>
        <CardFooter className="text-center">
            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
        </CardFooter>
        </form>
    </Card>
    </div>
  );
}

export default Login;
