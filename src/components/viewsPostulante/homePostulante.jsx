import React, { useEffect, useState } from 'react';
import { getPostulantePorCodigo } from '../../../helpers/postulante'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';
import { getServiciosPorCodigoPostulante } from '../../../helpers/servicioPostulante'

export const HomePostulante = () => {

  const [datosPostulante, setDatosPostulante] = useState([]);
  const [datosServicios, setDatosServicios] = useState([]);
  const { token, cod_usuario, setCodigo, codigo } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      //obtener los datos del postulante
      const obtenerPostulante = async () => {
        console.log(cod_usuario)
        console.log(token)
        const data = await getPostulantePorCodigo(cod_usuario, token);
        setDatosPostulante(data);
      };
      obtenerPostulante();
//se establece el codigo del postulante
      setCodigo(datosPostulante.codigo)

      //obtener los servicios seleccionados
      const obtenerServiciosPostulante = async () => {

        
        const dataServicios = await getServiciosPorCodigoPostulante(codigo, token);
        setDatosServicios(dataServicios);
      };
      obtenerServiciosPostulante(); 

      console.log('existe')
    } else {
      // redireccionar a la página de inicio de sesión
      console.log('no existe')
    }
    
  }, [token]);

  //console.log(datosPostulante)
  console.log('datos de los servicios',datosServicios)

  return (
    <div>homePostulante</div>
  )
}

