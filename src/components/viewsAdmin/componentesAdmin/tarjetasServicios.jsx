import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';

//bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


import { getServiciosEmpleadorNoRealizado } from '../../../../helpers/servicioEmpleador'

//contexto
import { TokenContext } from '../../../../src/components/context/contexto';
import { useContext } from 'react';

export const TarjetasServicios = () => {
  const [servicios, setServicios] = useState([]);

  const [serviciosEmpleadorNo, setServiciosEmpleadorNo] = useState([]);

  const { token } = useContext(TokenContext);

  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [codigoServicioSeleccionado, setCodigoServicioSeleccionado] = useState(0);

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

  useEffect(() => {
    const obtenerServiciosEmpleadorNoRealizados = async () => {
        const data = await getServiciosEmpleadorNoRealizado(codigoServicioSeleccionado, token);
        setServiciosEmpleadorNo(data);
      };
      obtenerServiciosEmpleadorNoRealizados();
  
  }, [codigoServicioSeleccionado]) 

  const handleServicioChange = (e) => {
    setCodigoServicioSeleccionado(e.target.value);
  };
  

  //console.log(servicioSeleccionado1)
  //console.log(servicioSeleccionado2)
 console.log("cod_servicio",codigoServicioSeleccionado)
 console.log(token)
  //console.log("cod_servicio",servicioSeleccionado2)
  console.log("servicio empleador no",serviciosEmpleadorNo)

  return (
    <>
      {/* Tarjeta 1 */}
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            
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
        <Form.Select value={codigoServicioSeleccionado} onChange={handleServicioChange}>
          <option value="">Seleccionar servicio</option>
          {serviciosFiltrados.map(servicio => (
            <option key={servicio.id} value={servicio.cod_servicio}>
              {servicio.nombre}
            </option>
          ))}
        </Form.Select>
      )}

    <ListGroup as="ol" numbered>
      {serviciosEmpleadorNo.map((servicio, index) => (
        <ListGroup.Item
          key={index}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {servicio.nombre} {servicio.apellido}
            </div>
            Tel: {servicio.tel}
          </div>

        </ListGroup.Item>
      ))}
    </ListGroup> 

          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};


