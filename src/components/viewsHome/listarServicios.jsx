import React, { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase/configFirebase';

import React from 'react'

export const listarServicios = () => {

    /* useEffect(() => {

        const obtenerDatos = async()=>{
          const datos = await getDocs(collection(db, 'administrador'));
          datos.forEach((documentos)=>{console.log(documentos.data())})
          //console.log(datos.docs[0].data)
        }
    
        obtenerDatos()
    
      }, []) */

  return (
    <div>listarServicios</div>
  )
}
