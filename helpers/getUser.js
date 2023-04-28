export const getUser = async() =>{

    const url = `https://apitopservicesgt-production.up.railway.app/users`;
    const resp = await fetch(url);
    const jsonData = await resp.json();
    //console.log(jsonData);

    return jsonData
}