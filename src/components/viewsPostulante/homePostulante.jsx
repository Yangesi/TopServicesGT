import React, { useEffect, useState } from 'react';
import { getPostulantePorCodigo } from '../../../helpers/postulante'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { getServiciosPorCodigoPostulante } from '../../../helpers/servicioPostulante'
import { actualizarPostulante } from '../../../helpers/postulante'
import { AgregarServicioPostulante } from './componentesPostulante/agregarServicioPostulante'
import { useNavigate } from "react-router-dom";


//react bootstrap
import { ListGroup, Button } from 'react-bootstrap';

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

  //function para cerrar sesion
  const handleCerrarSesion = () => {
    // Eliminar el token estableciéndolo como una cadena vacía o null
    setToken('');
  
  };
  
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
  


  //console.log('datos del postulante',datosPostulante)
  //console.log('datos de los servicios',datosServicios)

  return (
    <>
<ListGroup>
    {Object.keys(datosPostulante).map((key, index) => {
      if (["apellido", "nombre", "tel", "cv", "pretencion_salarial", "comentario"].includes(key)) {
        return (
          <ListGroup.Item key={index}>
            <span>{key}: </span>
            <input
              type="text"
              value={datosPostulante[key]}
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
<AgregarServicioPostulante></AgregarServicioPostulante>
<Button variant="primary" onClick={handleCerrarSesion}>
  Cerrar Sesión
</Button>

    </>
  )
}

