
export const getPostulantes = async (token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/postulantes`;
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

export const getPostulantePorCodigo = async (codigo_postulante, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/postulantes/${codigo_postulante}`;
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

export const crearPostulante = async (nuevoPostulante, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/postulantes/`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(nuevoPostulante)
  });
  const jsonData = await resp.json();
  return jsonData;
};

export const actualizarPostulante = async (codigo_postulante, datosPostulante, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/postulante/${codigo_postulante}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datosPostulante)
  });
  const jsonData = await resp.json();
  return jsonData;
};
