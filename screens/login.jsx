import React, { useState } from "react";
import { Form, Button, InputGroup, Card } from "react-bootstrap";


export const Login = () => {

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes realizar las validaciones y enviar los datos del formulario
    console.log(e.target.elements)
    console.log(e.target.elements.email.value)
    console.log(e.target.elements.password.value)
  }

  return (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
  <Card style={{ width: "40%" }}>
      <Card.Header></Card.Header>
      <Card.Body>
        <Card.Title className="text-center">Inicia sesión</Card.Title>
        <Card.Text>
        <Form onSubmit={handleSubmit}>
    <Form.Group className="mt-3" controlId="email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>

        <Form.Group className="mt-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" />
        </Form.Group>
        <div className="d-flex justify-content-center">
        <Button className="mt-3" variant="primary" type="submit">
        Iniciar sesión
        </Button>  
      </div>
    </Form>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
</div>
  )
}


