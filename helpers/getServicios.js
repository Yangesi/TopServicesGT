export const getServicios = async() =>{

    const url = `https://apitopservicesgt-production.up.railway.app/servicios`;
    const resp = await fetch(url);
    const jsonData = await resp.json();
    //console.log(jsonData);

    return jsonData
}

