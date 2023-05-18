import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export const TarjetasServicios1 = () => {
  const [servicios, setServicios] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
  }, []);

  useEffect(() => {
    if (tipoSeleccionado === '1') {
      const serviciosFiltradosTipo1 = servicios.filter(servicio => servicio.cod_tipo === 1);
      setServiciosFiltrados(serviciosFiltradosTipo1);
    } else if (tipoSeleccionado === '2') {
      const serviciosFiltradosTipo2 = servicios.filter(servicio => servicio.cod_tipo === 2);
      setServiciosFiltrados(serviciosFiltradosTipo2);
    } else {
      setServiciosFiltrados([]);
    }
  }, [tipoSeleccionado, servicios]);

  return (
    <>
      {/* Primer select */}
      <Form.Select
        value={tipoSeleccionado}
        onChange={e => setTipoSeleccionado(e.target.value)}
      >
        <option value="">Seleccionar tipo de servicio</option>
        <option value="1">Tipo 1</option>
        <option value="2">Tipo 2</option>
      </Form.Select>

      {/* Segundo select */}
      {tipoSeleccionado && (
        <Form.Select>
          <option value="">Seleccionar servicio</option>
          {serviciosFiltrados.map(servicio => (
            <option key={servicio.id} value={servicio.cod_servicio}>
              {servicio.nombre}
            </option>
          ))}
        </Form.Select>
      )}

      {/* Tarjeta */}
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            {/* Aquí se puede agregar el contenido de la tarjeta */}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};
