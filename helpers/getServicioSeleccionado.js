export const seleccionarServicio = async (codigo_usuario, codigo_servicio) => {
    const url = `https://apitopservicesgt-production.up.railway.app/api/serviciosSelecionados`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codigo_usuario, codigo_servicio })
    });
    const jsonData = await resp.json();
    return jsonData;
  };
  