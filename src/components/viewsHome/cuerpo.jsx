import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logoP from '../../logo/logoP.jpg'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/configFirebase';
import { Image, ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Piedepagina } from './piedepagina'


export const Cuerpo = () => {

  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, 'servicio'));
      setDocumentos(datos.docs.map(documento => documento.data()));
    };

    obtenerDatos();
  }, []);
  

  /* useEffect(() => {

    const obtenerDatos = async()=>{
      const datos = await getDocs(collection(db, 'administrador'));
      datos.forEach((documentos)=>{console.log(documentos.data())})
      //console.log(datos.docs[0].data)
    }

    obtenerDatos()

  }, []) */
  
  const documentosFiltrados = documentos.filter(documento => documento.tipo_servicio === 'Contables y de apoyo administrativo');

  const documentosFiltrados2 = documentos.filter(documento => documento.tipo_servicio === 'Recursos humanos');

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
            {documentosFiltrados.map(documento => (
              <ListGroup.Item key={documento.id}>
                {documento.nombre}
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
            {documentosFiltrados2.map(documento => (
              <ListGroup.Item key={documento.id}>
                {documento.nombre}
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
