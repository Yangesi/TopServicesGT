import React, { useEffect, useState } from 'react';
import { getServicios } from '../../../../helpers/getServicios';

//bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import logoP from '../../../logo/logoP.jpg'


import { getServiciosEmpleadorNoRealizado, actualizarServicioEmpleador, getServiciosEmpleadorPorCodigoServicio } from '../../../../helpers/servicioEmpleador'
import { getServiciosPostulantesPorCodigoServicio, actualizarServicioPostulante } from '../../../../helpers/servicioPostulante'

//contexto
import { TokenContext } from '../../../../src/components/context/contexto';
import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

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
  const [seleccionCv, setSeleccionCv] = useState('')


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

  const handleAsignarClick = async () => {
    if (seleccionEmpleador && seleccionPostulante) {
      const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const servicioEmpleador = {
        realizado: 1,
        fecha_realizado: fechaActual,
        id_servicio_postulante: seleccionPostulante
      };

      //const data = await actualizarServicioEmpleador(seleccionEmpleador, servicioEmpleador, token);

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

  const handleEliminarServicio = async(index) => {

    const servicio = serviciosEmpleadorSi[index];

    const id = servicio.id;
    const idServicioPostulante = servicio.id_servicio_postulante;

    console.log(id)
    console.log(idServicioPostulante)
    console.log(token)
    // Realizar la lógica para eliminar el servicio en la posición index
    // Puedes utilizar el índice para acceder al servicio específico dentro del array serviciosEmpleadorSi
    const actualizarServicioE = {
      realizado: 0,
      id_servicio_postulante: null, 
      fecha_realizado: null
    }

    const actualizarServicioP = {
      realizado: 0, 
      fecha_realizado: null
    }

    const respuestaP = await actualizarServicioPostulante(idServicioPostulante, actualizarServicioP, token);
    const respuestaE = await actualizarServicioEmpleador(id, actualizarServicioE, token);
    

    console.log(respuestaE)
    console.log(respuestaP)
  

  };
  
  
  //console.log("PostulantePorCodigo",serviciosPostulante)
  //console.log('id',seleccionEmpleador)
  //console.log('codigo',seleccionPostulante)
  //console.log("cod_servicio",codigoServicioSeleccionado)
  //console.log(token)
  //console.log("cod_servicio",servicioSeleccionado2)
  // console.log("servicio empleador no",serviciosEmpleadorNo)
  //console.log("Empleador true", serviciosEmpleadorSi)
  //console.log("cv seleccionado",seleccionCv)

  return (
    <>
    <Row style={{ margin: '10px' }}>
  <Col xs={11} md={8} className="mx-auto rounded-2 d-flex align-items-stretch" style={{ backgroundColor: '#f6f6f6' }}>
    <div style={{ overflowX: 'auto', width: '100%' }}>
      {seleccionCv ? (
        <iframe
          src={seleccionCv}
          title="Visualización de documento"
          width="100%"
          height="600px"
          className="border border-secondary"
          style={{ margin: '10px' }}
        ></iframe>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <h5>CV no disponible</h5>
          <img src={logoP} width="100px" alt="Logo" />
        </div>
      )}
    </div>
  </Col>

              
              
    
    <Col xs={11} md={4} className="mx-auto rounded-2 d-flex align-items-stretch" style={{ backgroundColor: '#f6f6f6' }}>

    <Card style={{maxHeight: '600px', overflowY: 'auto', width: '90%' }} className=" mx-auto mt-4">
              <Card.Body>
              <Card.Title>Empleadores filtrados</Card.Title>
    
    
            
              <Form.Select
                value={tipoSeleccionado}
                onChange={e => setTipoSeleccionado(e.target.value)}
                style={{ width: '200px' }}
              >
                <option value="">Seleccionar tipo de servicio</option>
                <option value="1">Tipo 1</option>
                <option value="2">Tipo 2</option>
              </Form.Select>
              

            
              {tipoSeleccionado && (
                <Form.Select
                  value={codigoServicioSeleccionado}
                  onChange={handleServicioChange}
                  style={{ width: '200px' }} // Ajusta el valor '200px' al ancho deseado
                >
                  <option value="">Seleccionar servicio</option>
                  {serviciosFiltrados.map(servicio => (
                    <option key={servicio.id} value={servicio.cod_servicio}>
                      {servicio.nombre}
                    </option>
                  ))}
                </Form.Select>

              )}
              <Card.Subtitle className="mt-4 mb-2">Empleadores sin postulantes</Card.Subtitle>
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
    
          

          
          
          <Card.Subtitle className="mt-4 mb-2">Postulantes disponibles</Card.Subtitle>
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
                  onChange={(e) => 
                  {
                  const selectedCV = servicio.cv;
                  setSeleccionPostulante(e.target.value);                 
                  setSeleccionCv(selectedCV);
                  }
                  }
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Subtitle className="mt-4 mb-2">Empleadores con postulantes asignados</Card.Subtitle>
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
              <Button variant="danger" onClick={() => handleEliminarServicio(index)}>
                Eliminar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="d-flex justify-content-center mt-4">
          <Button variant="primary" onClick={handleAsignarClick}>
            Asignar
          </Button>
        </div>

        
    
        </Card.Body>
        </Card>
        </Col>
    
    </Row>
  </>
);
              }  


