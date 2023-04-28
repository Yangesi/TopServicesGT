import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logoP from '../../logo/logoP.jpg'

import { Image, ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Piedepagina } from './piedepagina'
import { getServicios } from '../../../helpers/getServicios'


export const Cuerpo = () => {

  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
    
  }, []);
  
  const serviciosFiltrados = servicios.filter(servicio => servicio.cod_tipo === 1);

  const serviciosFiltrados2 = servicios.filter(servicio => servicio.cod_tipo === 2);

  return (
    <>
    <div className="container mb-4 mt-5 bg-light p-4 rounded-3">
      <div className="jumbotron">
        <h1>Nosotros</h1>
        <p>
          Gracias por utilizar nuestro sistema web. Como vendedor/a, tendrás acceso a funciones y herramientas que te permitirán gestionar eficientemente la información y procesos de la empresa.
        </p>
        <Image src={logoP} alt="Logo" width={350} height={350} className="img-fluid rounded-4 d-block" />
        <hr className="my-4" />
        <h2>Nuestros servicios</h2>

        <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Contables y de apoyo administrativo</Accordion.Header>
        <Accordion.Body>
          <div>
          <ListGroup>
            {serviciosFiltrados.map(servicio => (
              <ListGroup.Item key={servicio.cod_servicio}>
                {servicio.nombre}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Recursos humanos</Accordion.Header>
        <Accordion.Body>
        <div>
          <ListGroup>
            {serviciosFiltrados2.map(servicio => (
              <ListGroup.Item key={servicio.cod_servicio}>
                {servicio.nombre}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    
      </div>
    </div>
    <Piedepagina></Piedepagina>
    </>
  );
};
