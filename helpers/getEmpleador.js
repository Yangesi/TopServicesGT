
export const crearEmpleador = async (nuevoEmpleador) => {
    const url = `https://apitopservicesgt-production.up.railway.app/api/usuarios/crear-empleador`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoEmpleador)
    });
    const jsonData = await resp.json();
    return jsonData;
  };

  export const crearDatosEmpleador = async (datosEmpleador, token) => {

    const url = `https://apitopservicesgt-production.up.railway.app/api/empleadores/`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datosEmpleador)
    });
    const jsonData = await resp.json();
    return jsonData;
  };

  
export const obtenerListaEmpleadores = async (token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/empleadores/`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  });
  const jsonData = await resp.json();
  return jsonData;
};



export const obtenerEmpleadorPorCodigo = async (codigo, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/empleadores/${codigo}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  });
  const jsonData = await resp.json();
  return jsonData;
};



export const actualizarEmpleador = async (codigo, datosActualizados, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/empleadores/${codigo}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datosActualizados)
  });
  const jsonData = await resp.json();
  return jsonData;
};

