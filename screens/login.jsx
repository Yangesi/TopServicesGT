import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { TokenContext } from '../src/components/context/contexto';
import { useContext } from 'react';
import { iniciarSesion } from '../helpers/usuario'
import { useNavigate, Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

export const Login = () => {  

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  const handleEmailChange = (event) => {
    setCorreo(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setClave(event.target.value);
  };

  //actualizar mi contexto
  const { setToken, setCod_usuario } = useContext(TokenContext);

  //hook navigate
  const navigate = useNavigate();

  const enviarDatos = async () => {

    const usuario = {
      correo,
      clave
    };
  
    const respuestaUsuario = await iniciarSesion(usuario);

    const datoToken = respuestaUsuario.token;

    const decodedToken = jwt_decode(datoToken);
    const codigo_rol = decodedToken.codigo_rol;
    const codigo = decodedToken.code;

    //console.log(decodedToken)

    setToken(datoToken);
    setCod_usuario(codigo);

    let redirect = '/';
    switch (codigo_rol) {
      case 1:
        redirect = '/admin';
        break;
      case 2:
        redirect = '/postulante';
        break;
      case 3:
        redirect = '/empleador';
        break;
      default:
        break;
    }
    navigate(redirect);
 // muestra el valor del campo codigo_rol del token
  }

  

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes realizar las validaciones y enviar los datos del formulario
    
    enviarDatos();
  }

  return (
    <Container fluid className="h-100 w-100">
      <Row>
        <Card style={{ width: '18rem', marginTop: '100px' }} className="mx-auto">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title className="text-center">Inicia sesión</Card.Title>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={correo}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={clave}
                    onChange={handlePasswordChange}
                    name="password"
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button className="mt-3" variant="primary" type="submit">
                    Iniciar sesión
                  </Button>  
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to="/recuperar-clave">Olvidaste tu contraseña?</Link>
                </div>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </Row>
    </Container>
  );
}


