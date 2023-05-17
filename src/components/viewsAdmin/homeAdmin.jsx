import React, { useEffect, useState } from 'react';
import { obtenerListaEmpleadores } from '../../../helpers/getEmpleador'
import { getPostulantes } from '../../../helpers/postulante'
import { getServicios } from '../../../helpers/getServicios'
import { getServiciosEmpleadorPorCodigoServicio, getServiciosEmpleadorNoRealizado } from '../../../helpers/servicioEmpleador'
import { getServiciosPostulantesPorCodigoServicio } from '../../../helpers/servicioPostulante'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';


export const HomeAdmin = () => {

  const [listaEmpleadores, setListaEmpleadores] = useState([]);
  const [listaPostulantes, setListaPostulantes] = useState([]);
  const [listaEmpleadoresPorCodigoS, setListaEmpleadoresPorCodigoS] = useState([]);
  const [serviciosPostulantes, setserviciosPostulantes] = useState([])
  const [serviciosEmpleadorNo, setServiciosEmpleadorNo] = useState([]);
  const [servicios, setServicios] = useState([]);
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

      //obtener lista de servicios
      const obtenerServicios = async () => {
        const data = await getServicios();
        setServicios(data);
      };
      obtenerServicios();

      //obtener lista de empleadores por codigo de servicio
      const obtenerEmpleadoresPorCodigoS = async () => {
        //const data = await getServiciosEmpleadorPorCodigoServicio();
        //setListaEmpleadoresPorCodigoS(data);
      };
      obtenerEmpleadoresPorCodigoS();

      //obtener lista de empleadores por codigo de servicio no realizado
      const obtenerServiciosEmpleadorNoRealizados = async () => {
        //const data = await getServiciosEmpleadorNoRealizado();
        //setServiciosEmpleadorNo(data);
      };
      obtenerServiciosEmpleadorNoRealizados();

      //obtener lista de servicios de los postulantes
      const obtenerServiciosPostulantes = async () => {
        const data = await getServiciosPostulantesPorCodigoServicio(token);
        setserviciosPostulantes(data);
      };
      obtenerServiciosPostulantes();

      console.log('existe')
    } else {
      // redireccionar a la página de inicio de sesión
      console.log('no existe')
    }
    
  }, [token]);

  //console.log(listaEmpleadores)
  //console.log(listaPostulantes)
  //console.log(servicios)
  console.log(serviciosPostulantes)
  //console.log(token)

  return (
    <div>Hola Admin</div>
  )
}
