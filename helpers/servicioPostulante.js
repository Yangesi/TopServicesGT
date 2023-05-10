export const getServiciosPostulante = async (token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-postulante`;
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

export const getServiciosPorCodigoPostulante = async (codigo_postulante, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-postulante/${codigo_postulante}`;
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


export const crearServicioPostulante = async (nuevoServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-postulante/`;
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


export const actualizarServicioPostulante = async (codigo, datosServicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-postulante/${codigo}`;
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

