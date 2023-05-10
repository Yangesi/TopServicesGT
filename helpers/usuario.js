export const crearPostulante = async (nuevoPostulante) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/usuarios/crear-postulante`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPostulante)
  });
  const jsonData = await resp.json();
  return jsonData;
};


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


export const actualizarUsuario = async (codigo, datosUsuario, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/usuarios/${codigo}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datosUsuario)
  });
  const jsonData = await resp.json();
  return jsonData;
};


export const iniciarSesion = async (credenciales) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/usuarios/iniciar-sesion`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credenciales)
  });
  const jsonData = await resp.json();
  return jsonData;
};

