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
  