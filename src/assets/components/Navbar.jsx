import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../img/color-bw-03.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Usamos el logo importado */}
        <a href="/" className="">
        <img src={logo} alt="Logo" className="logo-img" />
        </a>

        {/* Enlaces de navegación */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transacciones">Transacciones</Link></li>
          <li><Link to="/tareas-habitos">Tareas y hábitos</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
          <li><Link to="/formulario">Formulario de contacto</Link></li> {/* Enlace al formulario */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;