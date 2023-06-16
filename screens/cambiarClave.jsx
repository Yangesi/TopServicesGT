import React, { useState } from 'react'
import jwt_decode from 'jwt-decode';
import { TokenContext } from '../src/components/context/contexto';
import { useContext } from 'react';
import { Form, Button, Container, Card, Row, Alert } from "react-bootstrap";

//peticion para cambiar clave antigua
import { cambiarClaveAntigua } from '../helpers/usuario'

import { useNavigate, Link } from "react-router-dom";

export const CambiarClave = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [error, setError] = useState('');
    const [realizado, setRealizado] = useState('');

    //actualizar mi contexto
    const { token } = useContext(TokenContext);

    //console.log(token)

      //hook navigate
  const navigate = useNavigate();

    const decodedToken = jwt_decode(token);
    const codigo_rol = decodedToken.codigo_rol;
    const correo = decodedToken.email;
    console.log(correo)
  
    const handleChangeOldPassword = (e) => {
      setOldPassword(e.target.value);
    };
  
    const handleChangeNewPassword = (e) => {
      setNewPassword(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      // Aquí puedes agregar la lógica para cambiar la contraseña utilizando los valores de oldPassword y newPassword
      console.log('Contraseña antigua:', oldPassword);
      console.log('Contraseña nueva:', newPassword);

      try{
      const datosClave = {
        correo, 
        claveAntigua: oldPassword,
        nuevaClave: newPassword
      }

      //console.log(datosClave)
      const data = await cambiarClaveAntigua(datosClave, token)
      console.log(data)
      // Restablecer los campos del formulario
      setOldPassword('');
      setNewPassword('');
      setRealizado('Cambio realizado')
      setError(null)
    }catch(error){
      if (error.response && error.response.data) {
        const mensajeError = error.response.data.error;
        setError(mensajeError);
      } else {
        setError('Error al cambiar la contraseña');
      }
    } 
};

//redireccionar el regreso 
const handleRegresar = () => {
  switch(codigo_rol){
    case 1:
  navigate('/admin');
  break;
  case 2:
    navigate('/postulante');
  break;
  case 3:
    navigate('/empleador');
  break;
  }
};
  
    return (
      <Container fluid className="h-100 w-100">
      <Row>
        <Card style={{ width: '20rem', marginTop: '100px' }} className="mx-auto">
          <Card.Header></Card.Header>
          <Card.Body>
          <Card.Title className="text-center">Cambia tu contraseña</Card.Title>
          {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              {realizado && (
                <Alert variant="success" className="mt-3">
                  {realizado}
                </Alert>
              )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="oldPassword">
            <Form.Label>Contraseña antigua:</Form.Label>
            <Form.Control
              type="password"
              placeholder='Ingresa tu contraseña'
              value={oldPassword}
              onChange={handleChangeOldPassword}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label className='mt-2'>Contraseña nueva:</Form.Label>
            <Form.Control
              type="password"
              placeholder='Ingresa tu contraseña'
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit">
              Confirmar
            </Button>
            <Button className='mr-2' variant="primary" type="submit" style={{ marginLeft: '10px' }} onClick={handleRegresar}>
              Regresar
            </Button>
          </div>


        </Form>
        </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </Row>
    </Container>
      );
    }
