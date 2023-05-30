import { crearEmpleador } from '../../../helpers/getEmpleador';
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { validarCorreo, validarPassword } from '../../../helpers/Validacion'

export function PrimerFormulario({ show, handleClose, form2 }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [correoValido, setCorreoValido] = useState(true);
  const [claveValida, setClaveValida] = useState(true);

  // Actualizar mi contexto
  const { setToken, setCod_usuario } = useContext(TokenContext);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setCorreo(value);
    setCorreoValido(validarCorreo(value));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setClave(value);
    setClaveValida(validarPassword(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    enviarDatos();
  };

  const enviarDatos = async () => {
    if (correoValido && claveValida) {
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
  }

  const isBotonSiguienteDisabled = !correoValido || !claveValida;

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
              isInvalid={!correoValido}
            />
            <Form.Control.Feedback type="invalid">
              Correo incorrecto
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={clave}
              onChange={handlePasswordChange}
              name="password"
              isInvalid={!claveValida}
            />
            <Form.Control.Feedback type="invalid">
              Clave incorrecta
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              form2();
              handleClose();
            }}
            disabled={isBotonSiguienteDisabled}
          >
            Siguiente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}



