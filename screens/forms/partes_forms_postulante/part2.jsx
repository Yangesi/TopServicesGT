import { useState, useEffect } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { crearPostulante } from '../../../helpers/postulante'

import { storage } from '../../../src/firebase/configFirebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { validarNombre, validarApellido, validarTel, validarPretensionSalarial } from '../../../helpers/Validacion';

export function SegundoFormularioP({ show, handleClose, form3 }) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tel, setTelefono] = useState('');
  const [pretencion_salarial, setPretension] = useState(0);
  const [comentario, setComentario] = useState('');
  const [cv, setCv] = useState('');
  const [url_cv, setUrl_cv] = useState(null);
  const [error, setError] = useState(null);

  //estados de validaciones
  const [nombreError, setNombreError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [telError, setTelefonoError] = useState(false);
  const [pretension_salarialError, setPretensionError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  //mi contexto para obtener el token y cod_usuario
  const { token, cod_usuario } = useContext(TokenContext);
  const { codigo, setCodigo } = useContext(TokenContext);
  console.log(token, cod_usuario, codigo)

  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setNombreError(validarNombre(value)); // Reiniciar el estado del error al cambiar el nombre
  };
  
  const handleApellidoChange = (e) => {
    const value = e.target.value;
    setApellido(value);
    setApellidoError(validarApellido(value)); // Reiniciar el estado del error al cambiar el apellido
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    setTelefonoError(validarTel(value)); // Reiniciar el estado del error al cambiar el teléfono
  };
 
  const handlePretensionChange = (e) => {
    const value = e.target.value;
    setPretension(value);
    setPretensionError(validarPretensionSalarial(value)); // Reiniciar el estado del error al cambiar el nombre
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    setUrl_cv(file);
  }

  //validando el formulario 
  useEffect(() => {
    // Validar el formulario cuando cambien los valores de los campos
    setIsFormValid(
      nombreError &&
      apellidoError &&
      telError &&
      pretension_salarialError
    );
  }, [nombreError, apellidoError, telError, pretension_salarialError]);
  
  useEffect(() => {
    const envio = async() => {
    const datosPostulante = {
      nombre,
      apellido,
      pretencion_salarial: parseInt(pretencion_salarial),
      comentario,
      cv,
      codigo_usuario: cod_usuario,
      tel
    };

    console.log('probando mi cv', datosPostulante);

    const respuestaPostulante = await crearPostulante(datosPostulante, token);

    console.log(respuestaPostulante);
    const datoCodPostulante = respuestaPostulante.codigo;
    console.log(datoCodPostulante);
    setCodigo(datoCodPostulante);
  }
    envio();

  }, [cv])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del segundo formulario a la API
    enviarDatos();
  };

  
  

  const enviarDatos = async () => {
    try {
      if (url_cv) {
        const storageRef = ref(storage, `cv/${url_cv.name}`);
        await uploadBytes(storageRef, url_cv);
        console.log('archivo subido');
  
        try {
          const url = await getDownloadURL(storageRef);
          console.log(`URL de descarga: ${url}`);
          setCv(url);

          
        } catch (error) {
          console.error(`Error al obtener la URL de descarga: ${error}`);
        }
      }
    } catch (error) {
      setError('Hubo un error al registrar al usuario');
      console.log('Error al registrar el usuario');
    }
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="PretensionSalarial">
              <Form.Label>Pretensión salarial</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu pretensión salarial"
                value={pretencion_salarial}
                onChange={handlePretensionChange}
                required
                isInvalid={!pretension_salarialError}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="CV">
              <Form.Label>Carga tu CV</Form.Label>
              <Form.Control
                type="file" 
                onChange={handleCvChange}
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={() => { form3(); handleClose(); }}
          disabled={!isFormValid} // Deshabilita el botón si hay algún error
          >
            Siguiente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}