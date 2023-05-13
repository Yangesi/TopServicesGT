import React, { useEffect, useState } from 'react';
import { obtenerListaEmpleadores } from '../../../helpers/getEmpleador'
import { getPostulantes } from '../../../helpers/postulante'
import { getServicios } from '../../../helpers/getServicios'
import { TokenContext } from '../../../src/components/context/contexto';
import { useContext } from 'react';


export const HomeAdmin = () => {

  const [listaEmpleadores, setListaEmpleadores] = useState([]);
  const [listaPostulantes, setListaPostulantes] = useState([]);
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

      console.log('existe')
    } else {
      // redireccionar a la página de inicio de sesión
      console.log('no existe')
    }
    
  }, [token]);

  //console.log(listaEmpleadores)
  //console.log(listaPostulantes)
  console.log(servicios)

  return (
    <div>Hola Admin</div>
  )
}
