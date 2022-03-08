import { BASE_URL_MIN_SALUD } from "../config";

export interface IGetTipoIdentificacion {
  id: string;
  value: string;
  label: string;
}

export const getTipoIdentificacion = () => {
  const url = `${BASE_URL_MIN_SALUD}/tipo_identificacion`;
  const options = { method: 'GET' };
  let data: IGetTipoIdentificacion[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.id}`, 'label': element.name, id: element.id });
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}