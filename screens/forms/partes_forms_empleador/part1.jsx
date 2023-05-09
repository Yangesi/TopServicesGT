import { crearEmpleador } from '../../../helpers/getEmpleador';
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

export function PrimerFormulario({show, handleClose, form2}) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  //actualizar mi contexto
  const { setToken, setCod_usuario } = useContext(TokenContext);


  const handleEmailChange = (event) => {
    setCorreo(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setClave(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    enviarDatos();
  };

  const enviarDatos = async () => {

    const nuevoEmpleador = {
      correo,
      clave
    };

    const respuestaEmpleador = await crearEmpleador(nuevoEmpleador);

    console.log(respuestaEmpleador);
    const datoToken = respuestaEmpleador.token;
    const datoCodUsuario = respuestaEmpleador.codigo;

    setToken(datoToken);
    setCod_usuario(datoCodUsuario);
    
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit"
          onClick={() => { form2(); handleClose(); }}>
            Siguiente
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

