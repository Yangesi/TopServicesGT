
import { app } from '../src/firebase/configFirebase';
import { Form, Button } from "react-bootstrap";

import React, { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(app);

function Login() {
  const firestore = getFirestore(app);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("submit", email, password, rol);

    if (isRegistrando) {
      // registrar
      registrarUsuario(email, password, rol);
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
<div className="form-container">
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Correo electrónico:</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" />
        </Form.Group>

        <Form.Group controlId="rol">
          <Form.Label>Rol:</Form.Label>
          <Form.Control as="select">
            <option value="postulante">Postulante</option>
            <option value="empleador">Empleador</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isRegistrando ? "Registrar" : "Iniciar sesión"}
        </Button>
      </Form>

      <Button variant="link" onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </Button>
    </div>
  );
}

export default Login;