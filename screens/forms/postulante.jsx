import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from "react-bootstrap";

export const Postulante = ({ show, handleClose }) => {

      const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría el código para enviar la información del formulario al servidor
        handleClose();
      };

      //modulo de contrase;as, parte 1 - boton para mostrar o escoder password
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
      setShowPassword(false); // Restablecer el estado del botón al cerrar el modal
    }, [show]);

    //validacion de contrase;as, validar que sean iguales 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(null); // Nuevo estado
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (confirmPassword !== "" && e.target.value !== confirmPassword) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }
    };
    
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      if (password !== "" && e.target.value !== password) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }
    };

    useEffect(() => {
      setPasswordMatch(password === confirmPassword && password !== "");
  }, [password, confirmPassword]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Postulante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Correo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
            type={showPassword ? 'text' : 'password'}
            defaultValue={password}
            onChange={handlePasswordChange}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ConfirmarPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
            type={showPassword ? 'text' : 'password'}
            defaultValue={confirmPassword}
            onChange={handleConfirmPasswordChange}
            />
            <Form.Text>
                {passwordMatch === false && (
                <span style={{ color: "red" }}>Las contraseñas no coinciden</span>
                )}
                {passwordMatch === true && (
                <span style={{ color: "green" }}>Las contraseñas coinciden</span>
                )}
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="TogglePasswordVisibility">
            <Form.Check
            type="switch"
            id="toggle-password-visibility"
            label="Mostrar contraseñas"
            onChange={togglePasswordVisibility}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu teléfono"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PretensionSalarial">
              <Form.Label>Pretensión salarial</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu pretensión salarial"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="CV">
              <Form.Label>Carga tu CV</Form.Label>
              <Form.Control
                type="file"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Areas_Postularse">
          <Form.Label>Areas a postularse</Form.Label>
          <Form.Control as="select">
            <option value="postulante">Postulante</option>
            <option value="empleador">Empleador</option>
          </Form.Control>
        </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" disabled={!passwordMatch} onClick={handleClose}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
