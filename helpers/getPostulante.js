export const crearPostulante = async (nuevoPostulante) => {
    const url = `https://apitopservicesgt-production.up.railway.app/api/postulantes`;
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