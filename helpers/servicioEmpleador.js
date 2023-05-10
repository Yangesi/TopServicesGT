export const getServiciosEmpleador = async (token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador`;
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

export const getServiciosPorCodigoEmpleador = async (codigo_empleador, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador/${codigo_empleador}`;
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


export const crearServicioEmpleador = async (nuevoServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador/`;
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


export const actualizarServicioEmpleador = async (codigo, datosServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador/${codigo}`;
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

