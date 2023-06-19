import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { crearServicio } from '../../../../helpers/servicio'

//contexto
import { TokenContext } from '../../context/contexto';
import { useContext } from 'react';

export const NuevoServicio = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
  }, []);

  const [selectedOption, setSelectedOption] = useState(0);
  const [textInput, setTextInput] = useState('');

  //contexto
  const { token, setToken } = useContext(TokenContext);
  const storedToken = localStorage.getItem('token');
  setToken(storedToken);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const enviarDatos = async () => {
      const servicioNuevo = {
        codigo_tipo_servicio: selectedOption,
        nombre: textInput
      }

      const data = await crearServicio(servicioNuevo, storedToken)
      console.log(data)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realiza alguna acción con los datos del formulario
    enviarDatos();
    // Restablece los valores del formulario
    setSelectedOption(0);
    setTextInput('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="selectOption">
        <Form.Label>Opción:</Form.Label>
        <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Seleccionar tipo de servicio</option>
          <option value="1">Tipo 1</option>
          <option value="2">Tipo 2</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="textInput">
        <Form.Label>Nombre del servicio:</Form.Label>
        <Form.Control type="text" value={textInput} onChange={handleTextChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
 
    </>
  );
};
