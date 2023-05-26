import React, { useEffect, useState } from 'react';
import { obtenerEmpleadorPorCodigo } from '../../../helpers/getEmpleador'
import { getServiciosPorCodigoEmpleador } from '../../../helpers/servicioEmpleador'

import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

//react bootstrap
import { ListGroup, Button } from 'react-bootstrap';


export const HomeEmpleador = () => {

  const [datosEmpleador, setDatosEmpleador] = useState({});
  const [datosServicios, setDatosServicios] = useState([]);
  const { token, cod_usuario, setCodigo, codigo } = useContext(TokenContext);

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
    }
  }, [token]);
  
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
    const handleEditarDato = (dato) => {
      // Implementa el código para editar el dato
      console.log('Editar dato:', dato);
    };
  
    // Manejador de evento para guardar cambios en un dato editado
    const handleGuardarCambios = (dato) => {
      // Implementa el código para guardar los cambios del dato
      console.log('Guardar cambios:', dato);
    };

    console.log(datosServicios)

  return (
    <>
<ListGroup>
  {Object.keys(datosEmpleador).map((key, index) => {
    if (["apellido", "nombre", "tel", "razon_social"].includes(key)) {
      return (
        <ListGroup.Item key={index}>
          <span>{datosEmpleador[key]}</span>
          <Button variant="primary" size="sm" onClick={() => handleEditarDato(datosEmpleador[key])}>
            Editar
          </Button>
          <Button variant="success" size="sm" onClick={() => handleGuardarCambios(datosEmpleador[key])}>
            Guardar Cambios
          </Button>
        </ListGroup.Item>
      );
    }
    return null; // Omitir otras claves del objeto
  })}
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
    </>
  );
};
