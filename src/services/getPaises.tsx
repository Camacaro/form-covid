import { BASE_URL_MIN_SALUD } from "../config";

export interface IPaises {
  id: string;
  value: string;
  label: string;
}

export const getPaises = () => {
  const url = `${BASE_URL_MIN_SALUD}/paises`;
  const options = { method: 'GET' };
  let data: IPaises[] = [];

  return fetch(url, options)
    .then(res => res.json())
    .then((json) => {
      json.data.forEach((element: any) => {
        // TODO que no se repitan los distritos
        const exist = data.find((item: IPaises) => item.label === element.name) 
        if(!exist) {
          data.push({ 'value': `${element.ISO31661A3}-${element.id}`, 'label': element.name, id: element.id });
        }
      });
      return data;
    })
    .catch(err => {
      console.error('error:' + err)
      return data;
    });
}