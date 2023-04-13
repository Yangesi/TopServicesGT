import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from "react-bootstrap";

import { app } from '../../src/firebase/configFirebase';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

export const Postulante = ({ show, handleClose }) => {

//los estados del email
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const auth = getAuth(app);

      //modulo de contrase;as, parte 1 - boton para mostrar o escoder password
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
      setShowPassword(false); // Restablecer el estado del botón al cerrar el modal
    }, [show]);

   //los estados de las contrase;as
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false); // Nuevo estado
    
    //estableciendo los valores de las password
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    }; 
    
 //validacion de contrase;as, validar que sean iguales 
    useEffect(() => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+#=(){}[\]<>|\\/^~`,.;:_-])[A-Za-z\d@$!%*?&+#=(){}[\]<>|\\/^~`,.;:_-]{8,}$/;
      setPasswordMatch(password === confirmPassword && password !== "" && passwordRegex.test(password));
  }, [password, confirmPassword]);

//validacion del email para verificar si ya existe una cuenta en firebase con ese email
  const handleEmailValidation = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError('Este correo electrónico ya está registrado');
        console.log('Error de handleEmailValidation, el correo ya esta registrado');
      } else {
        setIsEmailValidated(true);
        setError(null);
        console.log('todo ok con handleEmailValidation');
      }
    } catch (error) {
      setError('Hubo un error al validar el correo electrónico');
      console.log('Error de handleEmailValidation');
    }
  };

//constante submit donde se obtienen y se envian los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    // Aquí iría el código para enviar la información del formulario al servidor
    //antes de registrar el usuario, verifico la validacion del email
    if (!isEmailValidated) {
      setError('Por favor, valide su correo electrónico antes de continuar');
      console.log('error al validar email');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
      setError('Hubo un error al registrar al usuario');
      console.log('Error al registrar el usuario')
    }

    handleClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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
                name="email"
                placeholder="name@example.com"
                defaultValue={email}  
                onChange={handleEmailChange}
                required  
              />
              <Form.Text>
                {isEmailValidated === false && (
                <span style={{ color: "red" }}>Ya existe una cuenta con esta direccion de correo electrónico</span>
                )}
                {isEmailValidated === true && (
                <span style={{ color: "green" }}>Correo validado</span>
                )}
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
            type={showPassword ? 'text' : 'password'}
            defaultValue={password}
            onChange={handlePasswordChange}
            name="password"
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
        <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary" disabled={!passwordMatch} onClick={() => { handleClose; handleEmailValidation; }}>
            Registrarse
          </Button>
          <button type="button" onClick={handleEmailValidation}>
            Validar correo electrónico
          </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}
