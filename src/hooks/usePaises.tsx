import { useState, useEffect } from "react";
import { getPaises, IPaises } from "../services/getPaises";

export const usePaises = () => {
  const [paises, setPaises] = useState<IPaises[]>([]);

  useEffect(() => {
    getPaises().then((data) => setPaises(data))
  }, []);

  return {
    paises,
  }
}