import { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { crearDatosEmpleador } from '../../../helpers/getEmpleador'

export function SegundoFormulario({ show, handleClose, form3 }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [razon_social, setRazonSocial] = useState('');
  const [tel, setTelefono] = useState('');

  //mi contexto para obtener el token y cod_usuario
  const { token, cod_usuario } = useContext(TokenContext);
  const { codigo, setCodigo } = useContext(TokenContext);
  console.log('hola')
  console.log(token, cod_usuario, codigo)

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  
  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };
  
  const handleRazonSocialChange = (e) => {
    setRazonSocial(e.target.value);
  };
  
  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del segundo formulario a la API
    enviarDatos();
  };

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
    
  }
  
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
              onChange={handleNombreChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              onChange={handleApellidoChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Razon">
            <Form.Label>Razón social</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu razón social"
              onChange={handleRazonSocialChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu teléfono"
              onChange={handleTelefonoChange}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={() => { form3(); handleClose(); }}>
            Siguiente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
