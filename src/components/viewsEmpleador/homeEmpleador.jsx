import React, { useEffect, useState } from 'react';
import { obtenerEmpleadorPorCodigo } from '../../../helpers/getEmpleador'
import { getServiciosPorCodigoEmpleador } from '../../../helpers/servicioEmpleador'

import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';


export const HomeEmpleador = () => {

  const [datosEmpleador, setDatosEmpleador] = useState([]);
  const [datosServicios, setDatosServicios] = useState([]);
  const { token, cod_usuario, setCodigo, codigo } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      //obtener los datos del empleador
      const obtenerEmpleador = async () => {
        const data = await obtenerEmpleadorPorCodigo(cod_usuario, token);
        setDatosEmpleador(data);
      };
      obtenerEmpleador();
//se establece el codigo del empleador
      setCodigo(datosEmpleador.codigo)

      //obtener los servicios seleccionados
      const obtenerServiciosEmpleador = async () => {
        console.log(codigo)
        console.log(token)
        
        const dataServicios = await getServiciosPorCodigoEmpleador(codigo, token);
        setDatosServicios(dataServicios);
      };
      obtenerServiciosEmpleador();

      console.log('existe')
    } else {
      // redireccionar a la página de inicio de sesión
      console.log('no existe')
    }
    
  }, [token]);

  //datos a renderizar en html

  //console.log(datosEmpleador)  
  console.log(datosServicios)
  return (
    <div>Hola empleador</div>
  )
}
