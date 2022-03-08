import { useEffect, useState } from "react";
import { IGetTipoIdentificacion, getTipoIdentificacion } from "../services/getTipoIdentificacion";

export const useTipoIdentificacion = () => {
  const [tiposIdentificacion, setTipos] = useState<IGetTipoIdentificacion[]>([]);

  useEffect(() => {
    getTipoIdentificacion().then((data) => setTipos(data));
  }, []);

  return {
    tiposIdentificacion,
  };
}