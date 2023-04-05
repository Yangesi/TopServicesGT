
import React from 'react';
import './App.css';
import { Encabezado } from './components/viewsHome/encabezado'
import { Cuerpo } from './components/viewsHome/cuerpo'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import InfoUsuario from './components/infoUsuario'
import { HomeAdmin } from './components/viewsAdmin/homeAdmin'
import { HomeEmpleador } from './components/viewsEmpleador/homeEmpleador'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Encabezado/>}>
      <Route path='/' element={<Cuerpo/>}/>
      
      <Route path='/info-usuario' element={<InfoUsuario/>}/>
        
      </Route>
    </Routes>

    </>

      );
}



export default App;
