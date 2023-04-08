
import React from 'react';
import './App.css';
import { Encabezado } from './components/viewsHome/encabezado'
import { Cuerpo } from './components/viewsHome/cuerpo'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Login } from '../screens/login'
import { Registrarse } from '../screens/registrarse'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Encabezado/>}>
      <Route path='/' element={<Cuerpo/>}/>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/registrarse' element={<Registrarse/>}/>
        
      </Route>
    </Routes>

    </>

      );
}



export default App;
