import React, { useEffect, useState } from 'react';
import { obtenerEmpleadorPorCodigo, actualizarEmpleador } from '../../../helpers/getEmpleador'
import { getServiciosPorCodigoEmpleador } from '../../../helpers/servicioEmpleador'
import { AgregarServicioEmpleador } from './componentesEmpleador/agregarServicioEmpleador'

import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

//react bootstrap
import { ListGroup, Button, Card, Col, Row } from 'react-bootstrap';

//navigate
import { useNavigate, Link } from "react-router-dom";

//mensaje de bienvenida
import { Saludo } from '../msjBienvenida'
import { Piedepagina } from '.././viewsHome/piedepagina'


export const HomeEmpleador = () => {

  //hook navigate
  const navigate = useNavigate();

  const [datosEmpleador, setDatosEmpleador] = useState({
    apellido: '',
    nombre: '',
    tel: '',
    razon_social: '',
  });

  const [datosServicios, setDatosServicios] = useState([]);
  const { token, setToken, cod_usuario, setCodigo, codigo } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      // Obtener los datos del empleador
      const obtenerEmpleador = async () => {
        const data = await obtenerEmpleadorPorCodigo(cod_usuario, token);
        setDatosEmpleador(data);
      };
      obtenerEmpleador();
    } else {
      // Redireccionar a la página de inicio de sesión
      console.log('No existe el token');
      // Redirigir a la página de inicio de sesión
      let redirect = '/login';
      navigate(redirect);
    }
  }, [token]);

  //function para cerrar sesion
  const handleCerrarSesion = () => {
    // Eliminar el token estableciéndolo como una cadena vacía o null
    setToken('');
  
  };
  
  useEffect(() => {
    if (datosEmpleador.codigo) {
      // Establecer el código del empleador
      setCodigo(datosEmpleador.codigo);
  
      // Obtener los servicios seleccionados
      const obtenerServiciosEmpleador = async () => {
        const dataServicios = await getServiciosPorCodigoEmpleador(datosEmpleador.codigo, token);
        setDatosServicios(dataServicios);
      };
      obtenerServiciosEmpleador();
    }
  }, [datosEmpleador, setCodigo, token]);

    // Manejador de evento para editar un dato
    const [editando, setEditando] = useState(false);

    const handleEditar = () => {
      setEditando(true);
    };

    // Manejador de evento para guardar cambios en un dato editado
    const handleGuardarCambios = async() => {
      setEditando(false);
      // Aquí puedes realizar la lógica para guardar los cambios en el backend
      const nuevoEmpleador = {
        apellido: datosEmpleador.apellido,
        nombre: datosEmpleador.nombre,
        tel: datosEmpleador.tel,
        razon_social: datosEmpleador.razon_social
      }
      //console.log("datosEmpleador",nuevoEmpleador)
      
      const data = await actualizarEmpleador(codigo, nuevoEmpleador, token)
      console.log("respuesta",data)
    };

    const handleInputChange = (key, value) => {
      setDatosEmpleador((prevDatos) => ({
        ...prevDatos,
        [key]: value,
      }));
    };

    //console.log(datosServicios)
    console.log(token)

    //tomar solo el primer nombre del empleador
const nombreCompleto = datosEmpleador.nombre;
const primerNombre = nombreCompleto.split(" ")[0];

//objeto para imprimir los valores adecuados en los input de los datos personales
const nombresPersonalizados = {
  apellido: "Apellido",
  nombre: "Nombre",
  tel: "Teléfono",
  razon_social: "Razón social",
};

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
                      {Object.keys(datosEmpleador).map((key, index) => {
                        if (["apellido", "nombre", "tel", "razon_social"].includes(key)) {
                          return (
                            <ListGroup.Item key={index} className="d-flex flex-column">
                              <span>{nombresPersonalizados[key]} </span>
                              <input
                                type="text"
                                value={datosEmpleador[key]}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                disabled={!editando}
                              />
                            </ListGroup.Item>
                          );
                        }
                        return null; // Omitir otras claves del objeto
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
            <AgregarServicioEmpleador />
            </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
          </Col>
        </Row>
    
        <Piedepagina></Piedepagina>
        </div>
      </>
    );
                }    