
import React from 'react'

import { HomeAdmin } from './viewsAdmin/homeAdmin'
import { HomeEmpleador } from './viewsEmpleador/homeEmpleador'
import { HomePostulante } from './viewsPostulante/homePostulante'

function VistaPrincipal({ user }) {
  return (
    <div>
      Bienvenido
      
      {
        user.rol === "admin" ? <HomeAdmin /> : user.rol === "empleador" ? <HomeEmpleador /> : <HomePostulante />

        //user.rol === "admin" ? <HomeAdmin /> : <HomeEmpleador />
      }
    </div>
  );
}

export default VistaPrincipal;