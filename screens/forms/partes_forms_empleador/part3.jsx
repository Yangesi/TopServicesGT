import { Modal, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { getServicios } from '../../../helpers/getServicios'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { crearServicioEmpleador } from '../../../helpers/servicioEmpleador'

import { useNavigate, Link } from "react-router-dom";

export function TercerFormulario({show, handleClose}) {

//estados del contexto
    const { codigo, token } = useContext(TokenContext);

    //hook navigate
  const navigate = useNavigate();

    //estados de los servicios
    const [servicios, setServicios] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([]);

    //se realiza la peticion fetch para obtener los servicios
    useEffect(() => {
        const obtenerServicios = async () => {
          const data = await getServicios();
          setServicios(data);
        };
        obtenerServicios();
      }, []);

      //se obtienen los valores de los checkbox
      const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
          setCheckboxValues([...checkboxValues, value]);
        } else {
          setCheckboxValues(checkboxValues.filter((val) => val !== value));
        }
      };

      //se realiza el envio de los servicios seleccionados
      const enviarSeleccionServicios = async () => {
        checkboxValues.forEach(async (value) => {
          const codigo_servicio = value;
          const nuevoServicio = {
            codigo_empleador: codigo,
            codigo_servicio
          }
          console.log(nuevoServicio)
          await crearServicioEmpleador(nuevoServicio, token);
        });
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del segundo formulario a la API
        enviarSeleccionServicios();
      };

      //redireccionar el regreso 
      const handleIniciarSesion = () => {
        navigate('/empleador');
      };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de áreas de empleo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Areas_Postularse">
            <Form.Label>Áreas a postularse</Form.Label>
            {servicios.map((servicio) => (
              <Form.Check
                type="checkbox"
                key={servicio.cod_servicio}
                id={`check-${servicio.cod_servicio}`}
                label={servicio.nombre}
                value={servicio.cod_servicio}
                onChange={handleCheckboxChange}
              />
            ))}
            <p>Checkbox values: {checkboxValues.join(', ')}</p>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={handleClose} style={{ marginRight: '0.5rem' }}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleIniciarSesion}>
              Registrar
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

