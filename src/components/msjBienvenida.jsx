import React, { useEffect, useState } from 'react';

//react bootstrap
import { Row, Col } from 'react-bootstrap';

export function Saludo({ msj }) {

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

  return (
    <>
    <Row className="align-items-center">
  <Col>
    <h3 style={{ marginLeft: '10px' }}>{saludo}{msj}</h3>
  </Col>
</Row>

      </>
  );

}
