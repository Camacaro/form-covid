import { useState, useEffect } from "react";
import { ISucursales, getSucursales } from '../services/getSucursales';

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);

  useEffect(() => {
    getSucursales().then((data) => setSucursales(data));
  }, []);

  return {
    sucursales,
  };
}