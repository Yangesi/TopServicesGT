export const getServicios = async (token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicios/`;
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

export const getServicioPorCodigo = async (codigo_servicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicios/${codigo_servicio}`;
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

export const crearServicio = async (nuevoServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicios/`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(nuevoServicio)
  });
  const jsonData = await resp.json();
  return jsonData;
};

export const actualizarServicio = async (codigo, datosServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicios/${codigo}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datosServicio)
  });
  const jsonData = await resp.json();
  return jsonData;
};
