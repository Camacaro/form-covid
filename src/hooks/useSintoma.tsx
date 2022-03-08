import { useState, useEffect } from "react";
import { getSintomas, ISintoma } from "../services/getSintomas";

export const useSintoma = () => {
  const [sintomas, setSintomas] = useState<ISintoma[]>([]);

  useEffect(() => {
    getSintomas().then((data) => setSintomas(data))
  }, [])

  return {
    sintomas,
  }

}