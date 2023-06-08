import React, { useEffect, useState } from 'react';
import { getPostulantePorCodigo } from '../../../helpers/postulante'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { getServiciosPorCodigoPostulante } from '../../../helpers/servicioPostulante'
import { actualizarPostulante } from '../../../helpers/postulante'
import { AgregarServicioPostulante } from './componentesPostulante/agregarServicioPostulante'
import { useNavigate, Link } from "react-router-dom";

//mensaje de bienvenida
import { Saludo } from '../msjBienvenida'
import { Piedepagina } from '.././viewsHome/piedepagina'

//react bootstrap
import { ListGroup, Button, Card, Col, Row } from 'react-bootstrap';

export const HomePostulante = () => {

  //hook navigate
  const navigate = useNavigate();

  const [datosPostulante, setDatosPostulante] = useState({
    apellido: '',
    nombre: '',
    tel: '',
    cv: '',
    pretencion_salarial: '',
    comentario: '',
  });
  const [datosServicios, setDatosServicios] = useState([]);
  const { token, setToken, cod_usuario, setCodigo, codigo } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      // Obtener los datos del postulante
      const obtenerPostulante = async () => {
        console.log(cod_usuario);
        console.log(token);
        const data = await getPostulantePorCodigo(cod_usuario, token);
        setDatosPostulante(data);
        // Establecer el código del postulante
        setCodigo(data.codigo);
      };
      obtenerPostulante();
  
      console.log('existe');
    } else {
      // Redireccionar a la página de inicio de sesión
      console.log('no existe');
      // Redirigir a la página de inicio de sesión
      let redirect = '/login';
      navigate(redirect);
      
    }
  }, [token, cod_usuario]);
  
  useEffect(() => {
    if (codigo && token) {
      // Obtener los servicios seleccionados
      const obtenerServiciosPostulante = async () => {
        const dataServicios = await getServiciosPorCodigoPostulante(codigo, token);
        setDatosServicios(dataServicios);
      };
      obtenerServiciosPostulante();
    }
  }, [codigo, token]);

  const [editando, setEditando] = useState(false);

const handleEditar = () => {
  setEditando(true);
};

const handleGuardarCambios = async() => {
  setEditando(false);
  // Aquí puedes realizar la lógica para guardar los cambios en el backend
  const nuevoPostulante = {
    apellido: datosPostulante.apellido,
    nombre: datosPostulante.nombre,
    tel: datosPostulante.tel,
    //cv: datosPostulante.cv,
    pretencion_salarial: datosPostulante.pretencion_salarial,
    comentario: datosPostulante.comentario
  }
  //console.log("datosPostulante",nuevoPostulante)
  console.log(codigo)
  const data = await actualizarPostulante(codigo, nuevoPostulante, token)
  console.log("respuesta",data)
};

const handleInputChange = (key, value) => {
  setDatosPostulante((prevDatos) => ({
    ...prevDatos,
    [key]: value,
  }));
};

//tomar solo el primer nombre del postulante
const nombreCompleto = datosPostulante.nombre;
const primerNombre = nombreCompleto.split(" ")[0];

//objeto para imprimir los valores adecuados en los input de los datos personales
const nombresPersonalizados = {
  apellido: "Apellido",
  nombre: "Nombre",
  tel: "Teléfono",
  cv: "CV",
  pretencion_salarial: "Pretensión Salarial",
  comentario: "Comentario",
};
  


  //console.log('datos del postulante',datosPostulante)
  //console.log('datos de los servicios',datosServicios)
  //console.log('cv', datosPostulante.cv)

  return (
    <>
    <div style={{ overflowX: 'hidden' }}>
      <Saludo msj={", " + primerNombre} />
      <Row style={{ margin: '10px' }}>
        <Col xs={12} md={12}>
          <Card className="mx-auto mt-4">
            <Card.Header></Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <Card.Title className="text-center">Datos personales</Card.Title>
                  <ListGroup>
                    {Object.keys(datosPostulante).map((key, index) => {
                      if (["apellido", "nombre", "tel", "cv", "pretencion_salarial", "comentario"].includes(key)) {
                        return (
                          <ListGroup.Item key={index} className="d-flex flex-column">
                            <span>{nombresPersonalizados[key]} </span>
                            <input
                              type="text"
                              value={datosPostulante[key]}
                              onChange={(e) => handleInputChange(key, e.target.value)}
                              disabled={!editando}
                            />
                          </ListGroup.Item>
                        );
                      }
                      return null;
                    })}
                  </ListGroup>

          
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleEditar}
                    disabled={editando}
                    style={{ margin: '10px auto', display: 'block' }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleGuardarCambios}
                    disabled={!editando}
                    style={{ margin: '10px auto', display: 'block' }}
                  >
                    Guardar Cambios
                  </Button>
                  <div className="d-flex justify-content-center mt-3">
                      <Link to="/cambiar-clave">Cambiar contraseña</Link>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <Card.Title className="text-center">Servicios</Card.Title>
                  <ListGroup>
                    {datosServicios.map((servicio, index) => (
                      <ListGroup.Item key={index}>
                        <div className="fw-bold">
                          {servicio.tipo_servicio}
                        </div>
                        <div>{servicio.nombre}</div>
                        {(() => {
                          const fecha = new Date(servicio.fecha_hora);
                          const fechaLegible =
                            fecha.toLocaleDateString('es-ES') +
                            ' ' +
                            fecha.toLocaleTimeString('es-ES');
                          return <div>{fechaLegible}</div>;
                        })()}
                        {(() => {
                          const fecha = new Date(servicio.fecha_realizado);
                          const fechaLegible =
                            fecha.toLocaleDateString('es-ES') +
                            ' ' +
                            fecha.toLocaleTimeString('es-ES');
                          return <div>{fechaLegible}</div>;
                        })()}
                        {/* Puedes mostrar más propiedades del servicio según tus necesidades */}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <br></br>
                  <Card.Text>Agregar nuevo servicio</Card.Text>
                  <AgregarServicioPostulante />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row>
      
      <Row>
      <Col xs={12} md={12} className="d-flex justify-content-center mt-4">
  {datosPostulante.cv ? (
    <iframe
      src={datosPostulante.cv}
      title="Visualización de documento"
      width="70%"
      height="600px"
      className="border border-secondary"
    ></iframe>
  ) : (
    <div style={{ textAlign: 'center' }}>
      <h5>CV no disponible</h5>
    </div>
  )}
</Col>

      </Row>
      <Piedepagina></Piedepagina>
      </div>
    </>
  );
}    

