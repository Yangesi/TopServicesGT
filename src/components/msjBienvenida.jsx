import React, { useEffect, useState } from 'react';

import { TokenContext } from '../../src/components/context/contexto';
import { useContext } from 'react';

//icono de cerrar sesion
import { FaPowerOff } from 'react-icons/fa';

//react bootstrap
import { Row, Col } from 'react-bootstrap';


export function Saludo({ msj }) {

  const { token, setToken } = useContext(TokenContext);
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    const horaActual = new Date().getHours();

    if (horaActual >= 0 && horaActual < 12) {
      setSaludo('Buenos días');
    } else if (horaActual >= 12 && horaActual < 18) {
      setSaludo('Buenas tardes');
    } else {
      setSaludo('Buenas noches');
    }
  }, []);

  //function para cerrar sesion
  const handleCerrarSesion = () => {
    // Eliminar el token estableciéndolo como una cadena vacía o null
    setToken('');
  
  };

  return (
    <>
    <Row className="align-items-center">
  <Col>
    <h3 style={{ marginLeft: '10px' }}>{saludo}{msj}</h3>
  </Col>
  <Col xs="auto">
    <div className="d-flex justify-content-end mt-4">
      <FaPowerOff size={30} onClick={handleCerrarSesion} style={{ cursor: 'pointer' }} />
    </div>
  </Col>
</Row>

      </>
  );

}
