import React, { useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";

import { Postulante } from './forms/postulante'
//import { Empleador } from './forms/empleador'
import { PrimerFormulario } from './forms/partes_forms_empleador/part1'
import { SegundoFormulario } from './forms/partes_forms_empleador/part2'

export const Registrarse = () => {

    const [showPostulanteModal, setShowPostulanteModal] = useState(false);
    const [showEmpleadorModal, setShowEmpleadorModal] = useState(false);
  
    const handlePostulanteModalShow = () => setShowPostulanteModal(true);
    const handlePostulanteModalClose = () => setShowPostulanteModal(false);
    const handleEmpleadorModalShow = () => setShowEmpleadorModal(true);
    const handleEmpleadorModalClose = () => setShowEmpleadorModal(false);

    const [showEmpleadorModal2, setShowEmpleadorModal2] = useState(false);

    const handleEmpleadorModalShow2 = () => setShowEmpleadorModal2(true);
    const handleEmpleadorModalClose2 = () => setShowEmpleadorModal2(false);

  return (   
    <div className="container mb-4 mt-5 bg-light p-4 rounded-3">
      <div className="jumbotron">
    <Container fluid className="h-100 w-100">
  <Row>

    <Col className=" rounded-5 d-flex align-items-stretch p-4" style={{ backgroundColor: '#cb5034' }}>

    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>¿Buscas trabajo?</Card.Title>
        <Card.Text>
          "Top Services GT esta aquí para ayudarte en tu búsqueda de trabajo y apoyarte en todo lo que necesites para encontrar la mejor oportunidad laboral para ti".
          <br></br>
          <br></br>
        </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">

        </ListGroup>

        <Card.Body>

        <div className="d-flex justify-content-center">
        <Button onClick={handlePostulanteModalShow}>Registrarme postulante</Button>
        <Postulante
        show={showPostulanteModal}
        handleClose={handlePostulanteModalClose}
        />
        </div>

      </Card.Body>
    </Card>

    </Col>


    <Col className=" rounded-5 d-flex align-items-stretch p-4 bg-warning">

    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>¿Necesitas personal para tu empresa?</Card.Title>
        <Card.Text>
          "Nosotros te ayudamos a buscar los candidatos que tengan las habilidades y la experiencia necesaria para realizar el trabajo correctamente.".
        </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">

        </ListGroup>

        <Card.Body>

        <div className="d-flex justify-content-center">
        <Button onClick={handleEmpleadorModalShow}>Registrarme empleador</Button>

        <PrimerFormulario show={showEmpleadorModal} handleClose={handleEmpleadorModalClose} form2={handleEmpleadorModalShow2} /> 

        <SegundoFormulario show={showEmpleadorModal2} handleClose={handleEmpleadorModalClose2} /> 


        {/* <Empleador
        show={showEmpleadorModal}
        handleClose={handleEmpleadorModalClose}
        /> */}
        </div>

      </Card.Body>
    </Card>

    </Col>

  </Row>
</Container>
</div>
</div>

  )
}
