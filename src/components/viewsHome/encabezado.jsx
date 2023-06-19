import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { TokenContext } from '../../../src/components/context/contexto';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const Encabezado = () => {
  const { token, setToken } = useContext(TokenContext);
  const isLoggedIn = !!token;

    //hook navigate
    const navigate = useNavigate();

  //function para cerrar sesion
   const handleCerrarSesion = () => {
    // Eliminar el token estableciéndolo como una cadena vacía o null
    localStorage.removeItem('token');

    setToken('');

    let redirect = '/login';
    navigate(redirect);
    
   };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#" style={{ marginLeft: '1rem' }}>
          TOP SERVICES GT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          
          <Nav>
            {/* Mostrar botones en función de la variable isLoggedIn */}
            {!isLoggedIn && (
              <>
                <Link className="btn light" to="/" href="#">
                  Inicio
                </Link>
                <Link className="btn light" to="/login" href="#">
                  Iniciar sesión
                </Link>
                <Link className="btn light" to="/registrarse" href="#">
                  Registrarse
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn && (
          <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
            <FaPowerOff
              size={30}
              onClick={handleCerrarSesion}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </Navbar>
      <Outlet />
    </div>
  );
};
