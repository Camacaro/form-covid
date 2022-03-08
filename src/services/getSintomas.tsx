import { BASE_URL_MIN_SALUD } from "../config";

export interface ISintoma {
  id: string;
  value: string;
  label: string;
}

export const getSintomas = () => {
  const url = `${BASE_URL_MIN_SALUD}/sintomas`;
  const options = { method: 'GET' };
  let data: ISintoma[] = [];
  
  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.code}`, 'label': element.name, id: element.code });
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}