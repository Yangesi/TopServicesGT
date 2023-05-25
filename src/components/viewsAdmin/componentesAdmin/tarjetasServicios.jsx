import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';

//bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


import { getServiciosEmpleadorNoRealizado, actualizarServicioEmpleador, getServiciosEmpleadorPorCodigoServicio } from '../../../../helpers/servicioEmpleador'
import { getServiciosPostulantesPorCodigoServicio, actualizarServicioPostulante } from '../../../../helpers/servicioPostulante'

//contexto
import { TokenContext } from '../../../../src/components/context/contexto';
import { useContext } from 'react';

export const TarjetasServicios = () => {

  //lista de servicios
  const [servicios, setServicios] = useState([]);

  //lista de empleadores y postulantes filtrados por servicios
  const [serviciosEmpleadorNo, setServiciosEmpleadorNo] = useState([]);
  const [serviciosEmpleadorSi, setServiciosEmpleadorSi] = useState([]);
  const [serviciosPostulante, setServiciosPostulante] = useState([])

  //contexto
  const { token } = useContext(TokenContext);

  //select seleccionados
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [codigoServicioSeleccionado, setCodigoServicioSeleccionado] = useState(0);

//radio button seleccionados
  const [seleccionEmpleador, setSeleccionEmpleador] = useState(0);
  const [seleccionPostulante, setSeleccionPostulante] = useState(0);


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

  useEffect(() => {
    const obtenerServiciosEmpleadorRealizado = async () => {
        const data = await getServiciosEmpleadorPorCodigoServicio(codigoServicioSeleccionado, token);
        setServiciosEmpleadorSi(data);
      };
      obtenerServiciosEmpleadorRealizado();
      console.log('si',serviciosEmpleadorSi)
  }, [codigoServicioSeleccionado])
  
  useEffect(() => {

    const obtenerPostulantesPorCodigoServicio = async () => {
      const data = await getServiciosPostulantesPorCodigoServicio(codigoServicioSeleccionado, token);
      setServiciosPostulante(data);
    };
    obtenerPostulantesPorCodigoServicio();    

  }, [codigoServicioSeleccionado])
  

  const handleServicioChange = (e) => {
    setCodigoServicioSeleccionado(e.target.value);
  };
//pendiente de revisar, un useeffect no se puede usar dentro de un if
  const handleAsignarClick = async () => {
    if (seleccionEmpleador && seleccionPostulante) {
      const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const servicioEmpleador = {
        realizado: 1,
        fecha_realizado: fechaActual,
        id_servicio_postulante: seleccionPostulante
      };

      const data = await actualizarServicioEmpleador(seleccionEmpleador, servicioEmpleador, token);

      const servicioPostulante = {
        realizado: 1, 
        fecha_realizado: fechaActual
      }

      
      //pendiente de revisar
      const data2 = await actualizarServicioPostulante(seleccionPostulante, servicioPostulante, token);
      
      //console.log('servicioPostulante',data2);

    } else {
      console.log('error al selecionar los radio button')
    }
  };
  
  //console.log("PostulantePorCodigo",serviciosPostulante)
  //console.log('id',seleccionEmpleador)
  //console.log('codigo',seleccionPostulante)
  //console.log("cod_servicio",codigoServicioSeleccionado)
  //console.log(token)
  //console.log("cod_servicio",servicioSeleccionado2)
  // console.log("servicio empleador no",serviciosEmpleadorNo)
  //console.log("Empleador true", serviciosEmpleadorSi)

  return (
    <>
      {/* Tarjeta 1 */}
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Empleadores filtrados</Card.Title>
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
    <Card.Subtitle>Empleadores en false</Card.Subtitle>
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
      <Form.Check
        type="radio"
        name="empleador"
        value={servicio.id}
        onChange={(e) => setSeleccionEmpleador(e.target.value)}
      />
    </ListGroup.Item>
  ))}
</ListGroup>
<Card.Subtitle>Postulantes</Card.Subtitle>
<ListGroup as="ol" numbered>
  {serviciosPostulante.map((servicio, index) => (
    <ListGroup.Item
      key={index}
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {servicio.nombre} {servicio.apellido}
        </div>
        <div>Pretension salarial: {servicio.pretencion_salarial}</div>
      </div>
      <Form.Check
        type="radio"
        name="postulante"
        value={servicio.id}
        onChange={(e) => setSeleccionPostulante(e.target.value)}
      />
    </ListGroup.Item>
  ))}
</ListGroup>

<Card.Subtitle>Empleadores en true</Card.Subtitle>
<ListGroup as="ol" numbered>
  {serviciosEmpleadorSi.map((servicio, index) => (
    <ListGroup.Item
      key={index}
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {servicio.nom_empleador} {servicio.ap_empleador}
        </div>
        <div>{servicio.razon_social}</div>
        <div>{servicio.tel_empleador}</div>
        <div className="fw-bold">
          {servicio.nombre} {servicio.apellido}
        </div>
        <div>{servicio.tel}</div>
        {(() => {
          const fecha = new Date(servicio.fecha_realizado);
          const fechaLegible =
            fecha.toLocaleDateString('es-ES') +
            ' ' +
            fecha.toLocaleTimeString('es-ES');
          return <div>{fechaLegible}</div>;
        })()}
      </div>
      
    </ListGroup.Item>
  ))}
</ListGroup>
 
          </Card.Text>
          <Button variant="primary" onClick={handleAsignarClick}>
            Asignar
          </Button>

        </Card.Body>
      </Card>
    </>
  );
};


