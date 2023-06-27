import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';

//bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { crearServicioPostulante } from '../../../../helpers/servicioPostulante'

//contexto
import { TokenContext } from '../../../../src/components/context/contexto';
import { useContext } from 'react';

export const AgregarServicioPostulante = () => {

    //lista de servicios
  const [servicios, setServicios] = useState([]);

  //contexto
  const { token, codigo } = useContext(TokenContext);

  //select seleccionados
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [codigoServicioSeleccionado, setCodigoServicioSeleccionado] = useState(0);

  //obtener los servicios
  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
  }, []);

//filtrar los servicios segun el tipo
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

  const handleServicioChange = (e) => {
    setCodigoServicioSeleccionado(e.target.value);
  };

  const handleGuardarServicio = async() => {
    // Aquí puedes hacer lo que desees con el código del servicio seleccionado
    const crearServicioP = {
        codigo_postulante: codigo,
        codigo_servicio: codigoServicioSeleccionado
    }

    //console.log(crearServicioE)
    const data = await crearServicioPostulante(crearServicioP, token)
    //console.log(data)
  };

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
      <>
        <Form.Select
          value={codigoServicioSeleccionado}
          onChange={handleServicioChange}
        >
          <option value="">Seleccionar servicio</option>
          {serviciosFiltrados.map(servicio => (
            <option key={servicio.id} value={servicio.cod_servicio}>
              {servicio.nombre}
            </option>
          ))}
        </Form.Select>
        <Button className='mt-2' size="sm" variant="primary" onClick={handleGuardarServicio}>
          Agregar Servicio
        </Button>
      </>
    )}
  </>
);
}
