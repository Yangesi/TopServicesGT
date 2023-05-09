import React from 'react';

export const TokenContext = React.createContext({
    token: '',
    cod_usuario: null,
    cod_empleador: null,
    setToken: () => {},
    setCod_usuario: () => {},
    setCod_empleador: () => {},
  });
  

