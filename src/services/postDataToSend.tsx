import { BASE_URL_MIN_SALUD } from "../config";

export const postDataToSend = async (data: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(`${BASE_URL_MIN_SALUD}/agregar_registro`, requestOptions)
    .then(response => response.json())
    .then(data => data)
    .catch(console.log);
}