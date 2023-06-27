import React, { useState, useEffect } from 'react'
import { solicitarCambioContrasena, cambiarContrasena } from '../helpers/usuario.js'
import { Form, Button, Container, Card, Row, Alert } from "react-bootstrap";

import { Piedepagina } from '../src/components/viewsHome/piedepagina'

import { validarCorreo, validarPassword } from '../helpers/Validacion';

//redireccionamiento
import { useNavigate } from "react-router-dom";

export const RecuperarClave = () => {

    const [correo, setCorreo] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [codigoRecuperacion, setCodigoRecuperacion] = useState(0);
    const [nuevaClave, setNuevaClave] = useState("");

    //validaciones del formulario
  const [correoValido, setCorreoValido] = useState(false);
  const [claveValida, setClaveValida] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(true);
  const [errorClave, setErrorClave] = useState(true);
  const [error, setError] = useState('');

  //hook navigate
  const navigate = useNavigate();

    const handleEmailChange = (event) => {
      const value = event.target.value;
      setCorreo(value);
      setCorreoValido(validarCorreo(value));
    };

    const handlePasswordChange = (event) => {
      const value = event.target.value;
      setNuevaClave(value);
      setClaveValida(validarPassword(value));
    };
    //validando el formulario 
  useEffect(() => {
    // Validar el formulario cuando cambien los valores de los campos
    setErrorCorreo(
      correoValido
    );
  }, [correoValido]);

  useEffect(() => {
    // Validar el formulario cuando cambien los valores de los campos
    setErrorClave(
      claveValida
    );
  }, [claveValida]);


    const handleContinuarClick = async() => {
        // Aquí puedes realizar la lógica para enviar la solicitud de recuperación de contraseña con el correo ingresado
        //console.log("Correo:", correo);
        setMostrarFormulario(true);
        const solicitar = {
            correo
        }
        
        const data = await solicitarCambioContrasena(solicitar);
        
        //console.log(data);
    };

    
      const handleEnviarClick = async () => {
        // Aquí puedes realizar la lógica para enviar el código y la contraseña
        //console.log("Código:", codigoRecuperacion);
        //console.log("Contraseña:", nuevaClave);
      
        /* const cambiarClavee = {
          codigoRecuperacion: 83297,
          nuevaClave: "Pablopablo123=",
        }; */

        const cambiarClavee = {
            codigoRecuperacion: parseInt(codigoRecuperacion),
            nuevaClave
          };

        //console.log(cambiarClavee)
        try{
        const data = await cambiarContrasena(cambiarClavee);
        //console.log(data);
        let redirect = '/login';
        navigate(redirect);
        }
        catch(error)
        {
          if (error.response && error.response.data) {
            const mensajeError = error.response.data.error;
            setError(mensajeError);
          } else {
            setError('Código incorrecto');
          }

        }
      };
      
      return (
        <>
          {!mostrarFormulario && (
            <Container fluid className="h-100 w-100">
      <Row>
        <Card style={{ width: '20rem', marginTop: '100px' }} className="mx-auto">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title className="text-center">Recupera tu contraseña</Card.Title>
            <Card.Text style={{ marginTop: '10px' }}>Ingresa tu dirección de correo eléctronico.</Card.Text>
            
            <Card.Text>
            <Form>
              <Form.Group controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={correo}
                    onChange={handleEmailChange}
                    required
                    isInvalid={!errorCorreo}
                  />
                  <Form.Control.Feedback type="invalid">
                    Correo incorrecto
                  </Form.Control.Feedback>
              
              </Form.Group>
              <div className="d-flex justify-content-center mt-4">
                <Button disabled={!errorCorreo} variant="primary" type="button" onClick={handleContinuarClick}>
                  Continuar
                </Button>
              </div>
            </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </Row>
    </Container>
          )}
      
          {mostrarFormulario && (
            <Container fluid className="h-100 w-100">
      <Row>
        <Card style={{ width: '20rem', marginTop: '100px' }} className="mx-auto">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title className="text-center">Recupera tu contraseña</Card.Title>
            <Card.Text style={{ marginTop: '10px' }}>Revisa tu bandeja de entrada de la dirección de correo eléctronico ingresada anteriormente, te hemos enviado un código el cuál deberás ingresarlo en el siguiente apartado.</Card.Text>
            <Card.Text>
            {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            <Form>
              <Form.Group controlId="formCodigo">
                <Form.Label>Código:</Form.Label>
                <Form.Control
                  type="number"
                  value={codigoRecuperacion}
                  onChange={(e) => setCodigoRecuperacion(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formContrasena">
                    <Form.Label>Nueva contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={nuevaClave}
                    onChange={handlePasswordChange}
                    name="password"
                    isInvalid={!claveValida}
                  />
                  <Form.Control.Feedback type="invalid">
                    Tu contraseña debe contener como minimo 8 carácteres incluyendo mayúsculas, numeros, y simbolos.
                  </Form.Control.Feedback>
                
              </Form.Group>
              <div className="d-flex justify-content-center mt-4">
              <Button disabled={!errorClave} variant="primary" type="button" onClick={handleEnviarClick}>
                Recuperar contraseña
              </Button>
              </div>
              <div className="d-flex justify-content-center mt-2">
              <Button variant="primary" type="button" onClick={handleContinuarClick}>
                Volver a enviar código
              </Button>
              </div>

            </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </Row>
    </Container>
          )}
          <Piedepagina></Piedepagina>
        </>
      );

}
    
    
    
    
    
    
