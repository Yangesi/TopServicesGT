import { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { crearPostulante } from '../../../helpers/postulante'

import { storage } from '../../../src/firebase/configFirebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function SegundoFormularioP({ show, handleClose, form3 }) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pretencion_salarial, setPretension] = useState(0);
  const [comentario, setComentario] = useState('');
  const [cv, setCv] = useState('');
  const [url_cv, setUrl_cv] = useState(null);
  const [error, setError] = useState(null);

  //mi contexto para obtener el token y cod_usuario
  const { token, cod_usuario } = useContext(TokenContext);
  const { codigo, setCodigo } = useContext(TokenContext);
  console.log(token, cod_usuario, codigo)

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  
  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };
 
  const handlePretensionChange = (e) => {
    setPretension(e.target.value);
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    setUrl_cv(file);
  }
  
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
        console.log('archivo subido')
        getDownloadURL(storageRef)
        .then((url) => {
          console.log(`URL de descarga: ${url}`);
          setCv(url);
        })
        .catch((error) => {
          console.error(`Error al obtener la URL de descarga: ${error}`);
        });
      }

    const datosPostulante = {
      nombre,
      apellido,
      pretencion_salarial,
      comentario,
      cv,
      codigo_usuario: cod_usuario
    };

    console.log('probando mi cv',cv)

    const respuestaPostulante = await crearPostulante(datosPostulante, token);

    console.log(respuestaPostulante);
    const datoCodPostulante = respuestaPostulante.codigo;
    console.log(datoCodPostulante);
    setCodigo(datoCodPostulante);
    }catch(error){
        setError('Hubo un error al registrar al usuario');
        console.log('Error al registrar el usuario')
    }
    
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
          <Button variant="primary" type="submit" onClick={() => { form3(); handleClose(); }}>
            Siguiente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}