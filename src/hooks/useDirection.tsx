import { useEffect, useState, useCallback } from "react";
import { getCantones, ICantones } from "../services/getCantones";
import { getDistritos, IDistrito } from "../services/getDistritos";
import { getProvincias, IProvincias } from "../services/getProvincias";

export const useDirection = () => {
  const [provincias, setProvincias] = useState<IProvincias[]>([]);
  const [cantones, setCantones] = useState<ICantones[]>([]);
  const [distritos, setDistritos] = useState<IDistrito[]>([]);

  useEffect(() => {
    getProvincias().then((data) => {
      setProvincias(data);
    });
  }, []);

  const refreshCantones = useCallback(
    (idDistrito: string) => {
      getCantones(idDistrito).then((data) => setCantones(data))
    },
    [],
  );

  const refreshDistritos = useCallback(
    (idCanton: string) => {
      console.log('buscando distritos')
      getDistritos(idCanton).then((data) => setDistritos(data))
    },
    [],
  );

  const onSelectProvincia = (idDistrito: string) => refreshCantones(idDistrito);
  const onSelectCanton = (idCanton: string) => refreshDistritos(idCanton);

  return {
    provincias,
    cantones,
    distritos,
    onSelectProvincia,
    onSelectCanton,
  }
}