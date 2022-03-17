import * as Yup from 'yup';
import { motivoPrueba } from '../data/motivoPrueba';

export const validationSchema = Yup.object().shape({
  fecha_muestra: Yup.date().required('Fecha de muestra es requerida'),
  correo_electronico: Yup.string().email('Correo electrónico inválido'),
  nombre_paciente: Yup.string().required('Nombre es requerido'),
  primer_apellido_paciente: Yup.string().required('Primer apellido es requerido'),
  segundo_apellido_paciente: Yup.string().required('Segundo apellido es requerido'),
  identificacion: Yup.string().required('Identificación es requerido'),
  telefono: Yup.string().required('Teléfono es requerido'),
  telefono_adicional: Yup.string().required('Teléfono adicional es requerido'),
  ocupacion: Yup.string().required('Ocupación es requerido'),
  lugar_trabajo: Yup.string(),
  edad: Yup.number().required('Edad es requerido'),
  direccion_exacta: Yup.string().required('Dirección exacta es requerido'),
  metodo_diagnostico: Yup.string().required('Método de diagnóstico es requerido'),
  genero: Yup.object({
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  provincia: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  canton: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  distrito: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  sucursal: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  nacionalidad: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  tipo_identificacion: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  /** síntomas relacionados con el COVID-19 */
  presenta_sintomas: Yup.boolean(),
  sintomas: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('ID es requerido'),
        value: Yup.string().required('Valor es requerido'),
        label: Yup.string().required('Nombre es requerida'),
      })
    )
    .required('Sintomas es requerido'),
  fecha_inicio_sintomas: Yup.date()
    .when('presenta_sintomas', {
      is: true,
      then: Yup.date().required('Fecha de inicio de sintomas es requerida'),
    }),
  otros_sintomas: Yup.string(),
  /** contacto con caso confirmado por COVID-19 */
  contacto_caso_confirmado: Yup.boolean(),
  nombre_contacto_covid: Yup.string()
    .when('contacto_caso_confirmado', {
      is: true,
      then: Yup.string().required('Nombre de contacto es requerido'),
    }),
  tipo_contacto: Yup.string()
    .when('contacto_caso_confirmado', {
      is: true,
      then: Yup.string().required('Tipo de contacto es requerido'),
    }),
  fecha_primer_contacto: Yup.date()
    .when('contacto_caso_confirmado', {
      is: true,
      then: Yup.date().required('Fecha de primer contacto es requerida'),
    }),
  fecha_ultimo_contacto: Yup.date()
    .when('contacto_caso_confirmado', {
      is: true,
      then: Yup.date().required('Fecha de último contacto es requerida'),
    }),
  /** Ha realizado un viaje en los últimos 14 días */
  viaje_realizado: Yup.boolean(),
  lugar_visitado: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).when('viaje_realizado', {
    is: true,
    then: Yup.object({
      id: Yup.string().required('ID es requerido'),
      value: Yup.string().required('Valor es requerido'),
      label: Yup.string().required('Lugar visitado requerido'),
    }),
  }),
  fecha_visita: Yup.date()
    .when('viaje_realizado', {
      is: true,
      then: Yup.date().required('Fecha de visita es requerida'),
    }),
  /** Pais destino */
  motivo_prueba: Yup.string().required('Motivo de prueba es requerido'),
  pais_destino: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).when('motivo_prueba', {
    is: motivoPrueba.VIAJE,
    then: Yup.object({
      id: Yup.string().required('ID es requerido'),
      value: Yup.string().required('Valor es requerido'),
      label: Yup.string().required('País destino requerido'),
    }),
  }),
  fecha_viaje: Yup.date()
    .when('motivo_prueba', {
      is: motivoPrueba.VIAJE,
      then: Yup.date().required('Fecha de viaje es requerida'),
    }),
  /** Tutor */
  tutor_type: Yup.string()
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.string().required('Tipo de tutor es requerido'),
    }),
  tutor_nomber: Yup.string()
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.string().required('Nombre de tutor es requerido'),
    }),
  tutor_primer_apellido: Yup.string()
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.string().required('Primer apellido de tutor es requerido'),
    }),
  tutor_segundo_apellido: Yup.string()
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.string().required('Segundo apellido de tutor es requerido'),
    }),
  tutor_identificacion: Yup.string()
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.string().required('Tipo de identificación tutor es requerido'),
    }),
  tutor_tipo_identificacion: Yup.object({
      id: Yup.string(),
      value: Yup.string(),
      label: Yup.string(),
    })
    .when('edad', {
      is: (value: number) => value && value < 18,
      then: Yup.object({
        id: Yup.string().required('ID es requerido'),
        value: Yup.string().required('Valor es requerido'),
        label: Yup.string().required('Nombre es requerida'),
      }),
    })
})