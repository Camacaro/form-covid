import { BASE_URL_MIN_SALUD } from "../config";

export interface ICantones {
  id: string;
  value: string;
  label: string;
}

export const getCantones = (idProvincia: string) => {
  const url = `${BASE_URL_MIN_SALUD}/cantones/${idProvincia}`;
  const options = { method: 'GET' };
  let data: ICantones[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.id}`, 'label': element.name, 'id': element.id });
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });

}