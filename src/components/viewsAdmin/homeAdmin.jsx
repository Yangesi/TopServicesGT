import React, { useEffect, useState } from 'react';
import { obtenerListaEmpleadores } from '../../../helpers/getEmpleador'
import { getPostulantes } from '../../../helpers/postulante'
//import { getServiciosEmpleadorPorCodigoServicio } from '../../../helpers/servicioEmpleador'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';

//llamada de componentes
import { TarjetasServicios } from './componentesAdmin/tarjetasServicios'
import { EditarServicio } from './componentesAdmin/editarServicio'

//navigate
import { useNavigate } from "react-router-dom";

//react bootstrap
import { Button } from 'react-bootstrap';



export const HomeAdmin = () => {

  //hook navigate
  const navigate = useNavigate();

  const [listaEmpleadores, setListaEmpleadores] = useState([]);
  const [listaPostulantes, setListaPostulantes] = useState([]);
  const [listaEmpleadoresPorCodigoS, setListaEmpleadoresPorCodigoS] = useState([]);
  
  const { token, setToken } = useContext(TokenContext);

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

  

  //console.log(listaEmpleadores)
  //console.log(listaPostulantes)
  //console.log(serviciosPostulantes)
  console.log(token)

  return (
    <>
      <div><h1>Administrador</h1></div>
      <div style={{ overflowX: 'hidden' }}>
        <TarjetasServicios></TarjetasServicios>
        <EditarServicio></EditarServicio>
      </div>
      <Button variant="primary" onClick={handleCerrarSesion}>
        Cerrar Sesión
      </Button>
    </>
  );
  }  
