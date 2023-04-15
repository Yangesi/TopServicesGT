import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from "react-bootstrap";

import { app, db } from '../../src/firebase/configFirebase';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";

export const Postulante = ({ show, handleClose }) => {
// los estados de los datos generales del postulante 
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pretension, setPretension] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  
  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handlePretensionChange = (e) => {
    setPretension(e.target.value);
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };
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

  //validacion de email 
  useEffect(() => {
    if (email.trim().length === 0) {
      setIsEmailValidated(false);
    } else {
      handleEmailValidation();
    }
  }, [email])

    
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
        setIsEmailValidated(false);
      } else {
        setIsEmailValidated(true);
        setError(null);
        console.log('todo ok con handleEmailValidation');
      }
    } catch (error) {
      setError('Hubo un error al validar el correo electrónico');
      console.log('Error de handleEmailValidation');
      setIsEmailValidated(false);
    }
  };

//constante submit donde se obtienen y se envian los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.Nombre.value)
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
      console.log('UID Usuario registrado:', userCredential.user.uid);
      //en este try se registran datos del usuario en Cloud Firestore
      const UIDusuario = userCredential.user.uid;
      try {
        const docRef = await addDoc(collection(db, "usuario"), {
          email,
          rol: "Postulante", 
          uid: UIDusuario
        });

        const docRefP = await addDoc(collection(db, "postulante"), {
          nombre,
          apellido,
          telefono, 
          pretension,
          comentario, 
          uid: UIDusuario
        });
        
        console.log("Document Postulante written with ID: ", docRefP.id);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (error) {
      setError('Hubo un error al registrar al usuario');
      console.log('Error al registrar el usuario')
    }

    handleClose();
  };

  //obtiene el email del form y se establece en el usestate
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //limpiar los input cuando se ejecute el button de cerrar
  const handleClearInputs = () => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  }


// Add a  document with a generated ID.
const handleSubmitDocument = async () => {
  console.log();
try {
  const docRef = await addDoc(collection(db, "usuario"), {
    email,
    rol: "Postulante"
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}

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
                onChange={handleNombreChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                onChange={handleApellidoChange}
                
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
                <span style={{ color: "red" }}>Ingrese una direccion de correo electrónico valida</span>
                )}
                {isEmailValidated === true && (
                <span style={{ color: "green" }}>Correo válido</span>
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
                <span style={{ color: "red" }}>Las contraseñas no coinciden, recuerde colocar una contraseña segura (Su contraseña debe contener como minimo 8 caracteres, incluyendo mayúsculas, minúsculas, símbolos y números)</span>
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
                onChange={handleTelefonoChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PretensionSalarial">
              <Form.Label>Pretensión salarial</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu pretensión salarial"
                onChange={handlePretensionChange}
                
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
              <Form.Label>Comentario</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Déjanos tu comentario"
              onChange={handleComentarioChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Areas_Postularse">
          <Form.Label>Areas a postularse</Form.Label>
          <Form.Control as="select">
            <option value="postulante">Postulante</option>
            <option value="empleador">Empleador</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button className='m-1' variant="secondary" onClick={() => {
              handleClose();
              handleClearInputs();
            }}>
            Cerrar
          </Button>
          <Button type="submit" className='m-1' variant="primary" disabled={!passwordMatch || !isEmailValidated} onClick={handleClose}>
            Registrarse
          </Button>
        </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}
