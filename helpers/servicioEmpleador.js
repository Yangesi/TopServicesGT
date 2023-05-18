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



export const getServiciosEmpleadorPorCodigoServicio = async (codigo_servicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador/${codigo_servicio}`;
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

export const getServiciosEmpleadorNoRealizado = async (codigo_servicio, token) => {
  const url = `https://apitopservicesgt-production.up.railway.app/api/servicio-empleador/no-realizado/${codigo_servicio}`;
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

/* // Implementación de las rutas en Express

// Ruta: /api/servicio-postulante/servicio/:codigo_servicio
router.get('/servicio/:codigo_servicio', verificarToken(rol.admin), async (req, res) => {
  try {
    const { codigo_servicio } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const resultado = await getServiciosEmpleadorPorCodigoServicio(codigo_servicio, token);
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// Ruta: /api/servicio-postulante/no-realizado/:codigo_servicio
router.get('/no-realizado/:codigo_servicio', verificarToken(rol.admin), async (req, res) => {
  try {
    const { codigo_servicio } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const resultado = await getServiciosEmpleadorNoRealizado(codigo_servicio, token);
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
 */