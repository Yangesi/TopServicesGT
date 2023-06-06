import { useState, useEffect } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { crearDatosEmpleador } from '../../../helpers/getEmpleador'
import { validarNombre, validarApellido, validarTel } from '../../../helpers/Validacion';

export function SegundoFormulario({ show, handleClose, form3 }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [razon_social, setRazonSocial] = useState('');
  const [tel, setTelefono] = useState('');

  // Estados de validaciones
  const [nombreError, setNombreError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [telError, setTelefonoError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  // Mi contexto para obtener el token y cod_usuario
  const { token, cod_usuario } = useContext(TokenContext);
  const { codigo, setCodigo } = useContext(TokenContext);

  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setNombreError(validarNombre(value));
  };

  const handleApellidoChange = (e) => {
    const value = e.target.value;
    setApellido(value);
    setApellidoError(validarApellido(value));
  };

  const handleRazonSocialChange = (e) => {
    setRazonSocial(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    setTelefonoError(validarTel(value));
  };

  useEffect(() => {
    // Validar el formulario cuando cambien los valores de los campos
    setIsFormValid(nombreError && apellidoError && telError);
  }, [nombreError, apellidoError, telError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar los datos del segundo formulario a la API
    enviarDatos();
  }

  const enviarDatos = async () => {
    const datosEmpleador = {
      nombre,
      apellido,
      razon_social,
      tel,
      codigo_usuario: cod_usuario
    };

    const respuestaEmpleador = await crearDatosEmpleador(datosEmpleador, token);

    console.log(respuestaEmpleador);
    const datoCodEmpleador = respuestaEmpleador.codigo;
    console.log(datoCodEmpleador);
    setCodigo(datoCodEmpleador);
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ingresa tus datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              autoFocus
              value={nombre}
              onChange={handleNombreChange}
              required
              isInvalid={!nombreError}
            />
            <Form.Control.Feedback type="invalid">
              Nombre inválido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              value={apellido}
              onChange={handleApellidoChange}
              required
              isInvalid={!apellidoError}
            />
            <Form.Control.Feedback type="invalid">
              Apellido inválido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Razon">
            <Form.Label>Razón social</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu razón social"
              onChange={handleRazonSocialChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu teléfono"
              value={tel}
              onChange={handleTelefonoChange}
              required
              isInvalid={!telError}
            />
            <Form.Control.Feedback type="invalid">
              Teléfono inválido
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              form3();
              handleClose();
            }}
            disabled={!isFormValid} // Deshabilita el botón si hay algún error
          >
            Siguiente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}  