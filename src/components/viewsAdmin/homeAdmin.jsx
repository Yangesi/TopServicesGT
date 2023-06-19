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

//mensaje de bienvenida
import { Saludo } from '../msjBienvenida'
import { Piedepagina } from '.././viewsHome/piedepagina'

export const HomeAdmin = () => {

  //hook navigate
  const navigate = useNavigate();

  const [listaEmpleadores, setListaEmpleadores] = useState([]);
  const [listaPostulantes, setListaPostulantes] = useState([]);
  const [listaEmpleadoresPorCodigoS, setListaEmpleadoresPorCodigoS] = useState([]);
  
  const { token, setToken } = useContext(TokenContext);

  //implementando localstorage para guardar el token
  useEffect(() => {
    // Obtener el token almacenado en el localStorage al cargar la página
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      //obtener lista de empleadores
      const getListaEmpleadores = async () => {

        const data = await obtenerListaEmpleadores(storedToken);
        setListaEmpleadores(data);
      };
      getListaEmpleadores();
//obtener lista de postulantes
      const getListaPostulantes = async () => {

        const data = await getPostulantes(storedToken);
        setListaPostulantes(data);
      }; 
      getListaPostulantes();

    } else {
      // Redireccionar a la página de inicio de sesión si no hay token en el localStorage
      console.log('No existe el token');
      let redirect = '/login';
      navigate(redirect);
    }
  }, []);

  return (
    <>
      <Saludo msj=", Administrador"></Saludo>
      
      <div style={{ overflowX: 'hidden' }}>
        <TarjetasServicios></TarjetasServicios>
        <EditarServicio></EditarServicio>
      </div>

      <Piedepagina></Piedepagina>
    </>
  );
  }  
