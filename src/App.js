// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import Personas from "./components/personas/Personas";
import Error404 from "./components/Error404";

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <Router>
        <Header isLoggedIn={token} onLogout={handleLogout} />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={token ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path="/personas" element={token ? <Personas token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
