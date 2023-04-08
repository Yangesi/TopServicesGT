import React from 'react';

import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { app } from "../../firebase/configFirebase";
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(app);


export const Encabezado = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Aquí puedes comprobar si el usuario ha iniciado sesión o no
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  return (  
    <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#" style={{ marginLeft: '1rem' }}>TOP SERVICES GT</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          {/* <Dropdown expand="sm">
            <Dropdown.Toggle variant="light" id="dropdown-administracion" className="nav-link">
              Administración
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="viewsVend/vFERClientes.php">Clientes</Dropdown.Item>
              <Dropdown.Item href="viewsVend/vFER-Servicios.php">Servicios</Dropdown.Item>
              <Dropdown.Item href="viewsVend/vFER-Empleados.php">Empleados</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Nav>
        <Nav>
        {isLoggedIn && <Button variant='light' onClick={() => signOut(auth)}> Cerrar sesión</Button>}

      {!isLoggedIn && <Link className="btn light" to="/" href="#">Inicio</Link>}
      {/* Aquí se muestra el botón de Iniciar sesión solo si el usuario no ha iniciado sesión */}
      {!isLoggedIn && <Link className="btn light" to="/login" href="#">Iniciar sesión</Link>}

      {/* Aquí se muestra el botón de Registrarse solo si el usuario no ha iniciado sesión */}
      {!isLoggedIn && <Link className="btn light" to="/registrarse" href="#">Registrarse</Link>}
    </Nav>
        {/* <Nav>
          <Link className="btn light" to="/" href="#">Inicio</Link>
          <Link className="btn light" to="/info-usuario" href="#">Iniciar sesión</Link>
          <Nav.Link href="#">Registrarse</Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
    <Outlet/>
    </div>
  )
}
