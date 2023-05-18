import React, { useEffect, useState } from 'react';
import { obtenerListaEmpleadores } from '../../../helpers/getEmpleador'
import { getPostulantes } from '../../../helpers/postulante'
//import { getServiciosEmpleadorPorCodigoServicio } from '../../../helpers/servicioEmpleador'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

//llamada de componentes
import { TarjetasServicios } from './componentesAdmin/tarjetasServicios'




export const HomeAdmin = () => {

  const [listaEmpleadores, setListaEmpleadores] = useState([]);
  const [listaPostulantes, setListaPostulantes] = useState([]);
  const [listaEmpleadoresPorCodigoS, setListaEmpleadoresPorCodigoS] = useState([]);
  
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      //obtener lista de empleadores
      const getListaEmpleadores = async () => {

        const data = await obtenerListaEmpleadores(token);
        setListaEmpleadores(data);
      };
      getListaEmpleadores();
//obtener lista de postulantes
      const getListaPostulantes = async () => {

        const data = await getPostulantes(token);
        setListaPostulantes(data);
      }; 
      getListaPostulantes();

      //obtener lista de empleadores por codigo de servicio
      const obtenerEmpleadoresPorCodigoS = async () => {
        //const data = await getServiciosEmpleadorPorCodigoServicio();
        //setListaEmpleadoresPorCodigoS(data);
      };
      obtenerEmpleadoresPorCodigoS();

      console.log('existe')
    } else {
      // redireccionar a la página de inicio de sesión
      console.log('no existe')
    }
    
  }, [token]);

  

  //console.log(listaEmpleadores)
  //console.log(listaPostulantes)
  //console.log(serviciosPostulantes)
  //console.log(token)

  return (
    <>
      <div>Hola Admin</div>
      <TarjetasServicios></TarjetasServicios>
    </> 
  )
}
