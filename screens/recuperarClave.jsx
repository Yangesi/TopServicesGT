import React, { useState, useEffect } from 'react'
import { solicitarCambioContrasena, cambiarContrasena } from '../helpers/usuario.js'
import { Form, Button } from "react-bootstrap";

export const RecuperarClave = () => {

    const [correo, setCorreo] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [codigoRecuperacion, setCodigoRecuperacion] = useState(0);
    const [nuevaClave, setNuevaClave] = useState("");

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

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
        console.log("Código:", codigoRecuperacion);
        console.log("Contraseña:", nuevaClave);
      
        /* const cambiarClavee = {
          codigoRecuperacion: 83297,
          nuevaClave: "Pablopablo123=",
        }; */

        const cambiarClavee = {
            codigoRecuperacion: parseInt(codigoRecuperacion),
            nuevaClave
          };

        console.log(cambiarClavee)
      
        const data = await cambiarContrasena(cambiarClavee);
        console.log(data);
      };
      
      return (
        <>
          <div>RecuperarClave</div>
      
          {!mostrarFormulario && (
            <Form>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo:</Form.Label>
                <Form.Control
                  type="email"
                  value={correo}
                  onChange={handleCorreoChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleContinuarClick}>
                Continuar
              </Button>
            </Form>
          )}
      
          {mostrarFormulario && (
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
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={nuevaClave}
                  onChange={(e) => setNuevaClave(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleEnviarClick}>
                Enviar
              </Button>
              <Button variant="primary" type="button" onClick={handleContinuarClick}>
                Volver a enviar código
              </Button>
            </Form>
          )}
        </>
      );

}
    
    
    
    
    
    
