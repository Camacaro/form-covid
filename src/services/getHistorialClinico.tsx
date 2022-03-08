import { BASE_URL_MIN_SALUD } from "../config";

export interface IHistorialClinico {
  id: string;
  value: string;
  label: string;
}

export const getHistorialClinico = () => {
  const url = `${BASE_URL_MIN_SALUD}/historial_clinico`;
  const options = { method: 'GET' };
  let data: IHistorialClinico[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.code}`, 'label': element.name, id: element.id });
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });

}