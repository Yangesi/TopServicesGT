import React, { useEffect, useState } from 'react';
import { obtenerEmpleadorPorCodigo, actualizarEmpleador } from '../../../helpers/getEmpleador'
import { getServiciosPorCodigoEmpleador } from '../../../helpers/servicioEmpleador'
import { AgregarServicioEmpleador } from './componentesEmpleador/agregarServicioEmpleador'

import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

//react bootstrap
import { ListGroup, Button } from 'react-bootstrap';

//navigate
import { useNavigate } from "react-router-dom";


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

  return (
    <>
<ListGroup>
    {Object.keys(datosEmpleador).map((key, index) => {
      if (["apellido", "nombre", "tel", "razon_social"].includes(key)) {
        return (
          <ListGroup.Item key={index}>
            <span>{key}: </span>
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
    <Button variant="primary" size="sm" onClick={handleEditar} disabled={editando}>
      Editar
    </Button>
    <Button variant="success" size="sm" onClick={handleGuardarCambios} disabled={!editando}>
      Guardar Cambios
    </Button>
  </ListGroup>

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
    <AgregarServicioEmpleador></AgregarServicioEmpleador>
    <Button variant="primary" onClick={handleCerrarSesion}>
      Cerrar Sesión
    </Button>
    </>
  );
};
