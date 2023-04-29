import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../helpers/getServicios';
import { Form } from 'react-bootstrap';

export const List_check = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
  }, []);

  return (
    <div>
      <h2>Servicios</h2>
      <Form>
        {servicios.map((servicio) => (
          <Form.Check
            type="checkbox"
            key={servicio.cod_servicio}
            id={`check-${servicio.cod_servicio}`}
            label={servicio.nombre}
          />
        ))}
      </Form>
    </div>
  );
};






