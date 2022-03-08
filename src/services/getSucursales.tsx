import { BASE_URL_MIN_SALUD } from "../config";

export interface ISucursales {
  id: string;
  value: string;
  label: string;
}

export const getSucursales = () => {
  const url = `${BASE_URL_MIN_SALUD}/sucursales`;
  const options = { method: 'GET' };
  let data: ISucursales[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      console.log(json.data);
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.id_socursal}`, 'label': element.nombre_socursal, id: element.id_socursal });
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}