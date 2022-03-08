import { useState, useEffect } from "react";
import { getHistorialClinico, IHistorialClinico } from '../services/getHistorialClinico';

export const usehistorialClinico = () => {
  const [listaHistorial, setHistorial] = useState<IHistorialClinico[]>([]);

  useEffect(() => {
    getHistorialClinico().then((data) => setHistorial(data))
  }, []);

  return {
    listaHistorial,
  }
}