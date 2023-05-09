
export const crearEmpleador = async (nuevoEmpleador) => {
    const url = `https://apitopservicesgt-production.up.railway.app/api/usuarios/crear-empleador`;
    console.log(nuevoEmpleador)
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
    console.log(datosEmpleador)
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

  