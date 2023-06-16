import { crearPostulante } from '../../../helpers/usuario';
import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { validarCorreo, validarPassword } from '../../../helpers/Validacion';

export function PrimerFormularioP({ show, handleClose, form2 }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  //validaciones del formulario
  const [correoValido, setCorreoValido] = useState(false);
  const [claveValida, setClaveValida] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

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
      const nuevoPostulante = {
        correo,
        clave
      };

      const respuestaPostulante = await crearPostulante(nuevoPostulante);

      console.log(respuestaPostulante);
      const datoToken = respuestaPostulante.token;
      const datoCodUsuario = respuestaPostulante.codigo;

      setToken(datoToken);
      setCod_usuario(datoCodUsuario);
    }
  }

  //validando el formulario 
  useEffect(() => {
    // Validar el formulario cuando cambien los valores de los campos
    setIsFormValid(
      correoValido &&
      claveValida
    );
  }, [correoValido, claveValida]);

  //const isBotonSiguienteDisabled = !correoValido || !claveValida;

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
            Tu contraseña debe contener como minimo 8 carácteres incluyendo mayúsculas, numeros, y simbolos.
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={handleClose} style={{ marginRight: '0.5rem' }}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                form2();
                handleClose();
              }}
              disabled={!isFormValid} // Deshabilita el botón si hay algún error
            >
              Siguiente
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
}
