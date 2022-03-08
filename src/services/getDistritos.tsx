import { BASE_URL_MIN_SALUD } from "../config";

export interface IDistrito {
  id: string;
  value: string;
  label: string;
}

export const getDistritos = (idCanton: string) => {
  const url = `${BASE_URL_MIN_SALUD}/distritos/${idCanton}`;
  const options = { method: 'GET' };
  let data: IDistrito[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        data.push({ 'value': `${element.id}`, 'label': element.name, id: element.id })
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}