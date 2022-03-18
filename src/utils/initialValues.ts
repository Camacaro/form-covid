import { IGenero } from "../data/generos";
import { ICantones } from "../services/getCantones";
import { IDistrito } from "../services/getDistritos";
import { IHistorialClinico } from "../services/getHistorialClinico";
import { IPaises } from "../services/getPaises";
import { IProvincias } from "../services/getProvincias";
import { ISintoma } from "../services/getSintomas";
import { ISucursales } from "../services/getSucursales";
import { ITipoIdentificacion } from "../services/getTipoIdentificacion";

export interface IInitialValues {
  provincia: IProvincias
  canton: ICantones
  distrito: IDistrito

  nacionalidad: IPaises
  tipo_identificacion: ITipoIdentificacion
  genero: IGenero
  lugar_visitado: IPaises
  pais_destino: IPaises
  sucursal: ISucursales

  sintomas: ISintoma[];
  historial_clinico: IHistorialClinico[];

  viaje_realizado: boolean;
  contacto_caso_confirmado: boolean;
  presenta_sintomas: boolean;

  fecha_muestra: Date|string;
  fecha_visita: Date|string;
  fecha_primer_contacto: Date|string;
  fecha_inicio_sintomas: Date|string;
  fecha_ultimo_contacto: Date|string;
  fecha_viaje: Date|string;


  direccion_exacta: string;
  nombre_paciente: string;
  primer_apellido_paciente: string;
  segundo_apellido_paciente: string;
  correo_electronico: string;
  edad: number|string;
  identificacion: string;
  telefono: string;
  telefono_adicional: string;
  ocupacion: string;
  lugar_trabajo: string;
  nombre_contacto_covid: string;
  tipo_contacto: string;
  otros_sintomas: string;
  metodo_diagnostico: string;
  motivo_prueba: string;
  fecha_nacimiento: Date|string;

  tutor_type: string;
  tutor_nomber: string;
  tutor_identificacion: string;
  tutor_primer_apellido: string;
  tutor_segundo_apellido: string;
  tutor_tipo_identificacion: ITipoIdentificacion;

  estado_embarazo: boolean;
  semanas_embarazo: number|string;
}

export const initialValues: IInitialValues = {
  provincia: {
    id: '',
    value: '',
    label: ''
  },
  canton: {
    id: '',
    value: '',
    label: ''
  },
  distrito: {
    id: '',
    value: '',
    label: ''
  },
  nacionalidad: {
    id: '',
    value: '',
    label: ''
  },
  tipo_identificacion:  {
    id: '',
    value: '',
    label: ''
  },
  genero: {
    value: '',
    label: ''
  },
  lugar_visitado: {
    id: '',
    value: '',
    label: ''
  },
  pais_destino: {
    id: '',
    value: '',
    label: ''
  },
  sucursal: {
    id: '',
    value: '',
    label: ''
  },

  sintomas: [],
  historial_clinico: [],

  viaje_realizado: false,
  contacto_caso_confirmado: false,
  presenta_sintomas: false,

  fecha_muestra: new Date(),
  fecha_visita: '',
  fecha_primer_contacto: '',
  fecha_inicio_sintomas: '',
  fecha_ultimo_contacto: '',
  fecha_viaje: '',
  fecha_nacimiento: '',

  direccion_exacta: '',
  nombre_paciente: '',
  primer_apellido_paciente: '',
  segundo_apellido_paciente: '',
  correo_electronico: '',
  edad: '',
  identificacion: '',
  telefono: '',
  telefono_adicional: '',
  ocupacion: '',
  lugar_trabajo: '',
  nombre_contacto_covid: '',
  tipo_contacto: '',
  otros_sintomas: '',
  metodo_diagnostico: '',
  motivo_prueba: '',

  tutor_type: '',
  tutor_identificacion: '',
  tutor_nomber: '',
  tutor_primer_apellido: '',
  tutor_segundo_apellido: '',
  tutor_tipo_identificacion: {
    id: '',
    value: '',
    label: ''
  },

  estado_embarazo: false,
  semanas_embarazo: '',
}
