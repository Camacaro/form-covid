import { useEffect, useState } from "react";
import { ITipoIdentificacion, getTipoIdentificacion } from "../services/getTipoIdentificacion";

export const useTipoIdentificacion = () => {
  const [tiposIdentificacion, setTipos] = useState<ITipoIdentificacion[]>([]);

  useEffect(() => {
    getTipoIdentificacion().then((data) => setTipos(data));
  }, []);

  return {
    tiposIdentificacion,
  };
}