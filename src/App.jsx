
import React, {useState} from 'react';
import './App.css';
import { Encabezado } from './components/viewsHome/encabezado'
import { Cuerpo } from './components/viewsHome/cuerpo'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Login } from '../screens/login'
import { Registrarse } from '../screens/registrarse'
import { List_check } from '../screens/forms/list_Servicios/list_check'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TokenContext } from './components/context/contexto';

function App() {
  const [token, setToken] = useState('');
  const [cod_usuario, setCod_usuario] = useState(null);
  const [codigo, setCodigo] = useState(null);

  return (
    <>
    <TokenContext.Provider value={{ token, cod_usuario, codigo, setToken, setCod_usuario, setCodigo }}>
    <Routes>
      <Route path='/' element={<Encabezado/>}>
      <Route path='/' element={<Cuerpo/>}/>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/registrarse' element={<Registrarse/>}/>
      <Route path='/prueba' element={<List_check/>}/>
        
      </Route>
    </Routes>
    </TokenContext.Provider>
    </>

      );
}



export default App;
