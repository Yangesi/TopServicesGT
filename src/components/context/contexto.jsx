import React from 'react';

export const TokenContext = React.createContext({
    token: '',
    cod_usuario: null,
    codigo: null,
    setToken: () => {},
    setCod_usuario: () => {},
    setCodigo: () => {},
  });
  

