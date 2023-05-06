import { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";

export function SegundoFormulario({ show, handleClose }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [telefono, setTelefono] = useState('');
  
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
          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
