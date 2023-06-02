import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { TokenContext } from '../src/components/context/contexto';
import { useContext } from 'react';

//peticion para cambiar clave antigua
import { cambiarClaveAntigua } from '../helpers/usuario'

export const CambiarClave = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    //actualizar mi contexto
    const { token } = useContext(TokenContext);

    //console.log(token)

    const decodedToken = jwt_decode(token);
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
    };
  
    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="oldPassword">
            <Form.Label>Contraseña antigua:</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={handleChangeOldPassword}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Contraseña nueva:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirmar
          </Button>
        </Form>
      );
    }
