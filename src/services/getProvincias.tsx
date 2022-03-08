import { BASE_URL_MIN_SALUD } from "../config";

export interface IProvincias {
  id: string;
  value: string;
  label: string;
}

export const getProvincias = async () => {
  const url = `${BASE_URL_MIN_SALUD}/provincias`;
  const options = { method: 'GET' };
  let data: IProvincias[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        // TODO que no se repitan los distritos
        const exist = data.find((item: IProvincias) => item.label === element.name) 
        if(!exist) {
          data.push({ 'value': `${element.id}`, 'label': element.name, id: element.id });
        }
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}