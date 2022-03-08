import { Box, Card, CardContent, Grid, TextField, CircularProgress, FormHelperText, Button, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Page } from '../components/Page';

import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { useDirection } from '../hooks/useDirection';
import { usePaises } from '../hooks/usePaises';
import { useSintoma } from '../hooks/useSintoma';
import { usehistorialClinico } from '../hooks/usehistorialClinico';
import { metodoDiagnostico } from '../data/metodoDiagnostico';
import { motivosPrueba, motivoPrueba } from '../data/motivoPrueba';
import { useSucursales } from '../hooks/useSucursales';
import { useTipoIdentificacion } from '../hooks/useTipoIdentificacion';

const initialValues = {
  fecha_muestra: new Date(),

  // // infoDireccion
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
  direccion_exacta: '',

  // // infoPersonal
  nombre_paciente: '',
  primer_apellido_paciente: '',
  segundo_apellido_paciente: '',
  correo_electronico: '',
  edad: '',
  nacionalidad: {
    // id: '',
    value: '',
    label: ''
  },
  tipo_identificacion:  {
    id: '',
    value: '',
    label: ''
  },
  identificacion: '',
  // fechaNacimiento: '',
  telefono: '',
  telefono_adicional: '',
  ocupacion: '',
  lugar_trabajo: '',
  genero: {
    value: '',
    label: ''
  },

  // // viajeRealizado
  viaje_realizado: false,
  lugar_visitado: {
    id: '',
    value: '',
    label: ''
  },
  fecha_visita: '',

  // // contactoCaso 
  contacto_caso_confirmado: false,
  nombre_contacto_covid: '',
  tipo_contacto: '',
  fecha_primer_contacto: '',
  fecha_ultimo_contacto: '',

  // // sintomas
  presenta_sintomas: false,
  // presenta_sintomas: '',
  sintomas: [],
  fecha_inicio_sintomas: '',
  otros_sintomas: '',

  // // estadoEmbarazo
  // estado_embarazo: '',
  // semanas_embarazo: '',

  historial_clinico: [],

  metodo_diagnostico: '',
  motivo_prueba: '',
  
  fecha_viaje: '',
  pais_destino: {
    id: '',
    value: '',
    label: ''
  },
  sucursal: {
    id: '',
    value: '',
    label: ''
  }
}

const validationSchema = Yup.object().shape({
  fecha_muestra: Yup.date().required('Fecha de muestra es requerida'),
  // TODO Require opcional con el viaje_realizado
  fecha_visita: Yup.date().required('Fecha de visita es requerida'),
  correo_electronico: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  nombre_paciente: Yup.string().required('Nombre es requerido'),
  primer_apellido_paciente: Yup.string().required('Primer apellido es requerido'),
  segundo_apellido_paciente: Yup.string().required('Segundo apellido es requerido'),
  identificacion: Yup.string().required('Identificación es requerido'),
  telefono: Yup.string().required('Teléfono es requerido'),
  telefono_adicional: Yup.string().required('Teléfono adicional es requerido'),
  ocupacion: Yup.string().required('Ocupación es requerido'),
  lugar_trabajo: Yup.string().required('Lugar de trabajo es requerido'),
  direccion_exacta: Yup.string().required('Dirección exacta es requerido'),
  viaje_realizado: Yup.boolean(),
  contacto_caso_confirmado: Yup.boolean(),

  // TODO Require opcional con el contacto_caso_confirmado
  nombre_contacto_covid: Yup.string().required('Nombre de contacto es requerido'),
  tipo_contacto: Yup.string().required('Tipo de contacto es requerido'),
  fecha_primer_contacto: Yup.date().required('Fecha de primer contacto es requerida'),
  fecha_ultimo_contacto: Yup.date().required('Fecha de último contacto es requerida'),

  presenta_sintomas: Yup.boolean(),
  // TODO Require opcional con el presenta_sintomas
  fecha_inicio_sintomas: Yup.date().required('Fecha de inicio de sintomas es requerida'),
  otros_sintomas: Yup.string(),

  fecha_viaje: Yup.date().required('Fecha de viaje es requerida'),

  metodo_diagnostico: Yup.string().required('Método de diagnóstico es requerido'),
  motivo_prueba: Yup.string().required('Motivo de prueba es requerido'),

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
  // TODO Require opcional con el viaje_realizado
  lugar_visitado: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  pais_destino: Yup.object({
    id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
  // TODO Require opcional con el presenta_sintomas
  sintomas: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('ID es requerido'),
        value: Yup.string().required('Valor es requerido'),
        label: Yup.string().required('Nombre es requerida'),
      })
    )
    .required('Sintomas es requerido'),
  historial_clinico: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('ID es requerido'),
        value: Yup.string().required('Valor es requerido'),
        label: Yup.string().required('Nombre es requerida'),
      })
    )
    .required('Sintomas es requerido'),
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
    // id: Yup.string().required('ID es requerido'),
    value: Yup.string().required('Valor es requerido'),
    label: Yup.string().required('Nombre es requerida'),
  }),
})

const generos = [
  {
    value: 'M',
    label: 'Masculino',
  },
  {
    value: 'F',
    label: 'Femenino',
  }
]

export const FormCovid = () => {
  const [idProvincia, setIdProvincia] = useState('')
  const [idCanton, setIdCanton] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { provincias, cantones, distritos, onSelectCanton, onSelectProvincia } = useDirection()
  const { paises } = usePaises();
  const { sintomas } = useSintoma()
  const { listaHistorial } = usehistorialClinico();
  const { sucursales } = useSucursales()
  const { tiposIdentificacion } = useTipoIdentificacion()

  // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  // const handleChange = (newValue: any) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    if(idProvincia) onSelectProvincia(idProvincia)
  }, [idProvincia])

  useEffect(() => {
    if(idCanton) onSelectCanton(idCanton)
  }, [idCanton])

  const onSubmit: any = async (values: {}, formikHelpers: FormikHelpers<{}>) => {
    try {
      console.log(values)

      // fecha_muestra
      // const date = format(value || new Date(), 'yyyy-MM-dd')

    } catch (err: any) {
      formikHelpers.resetForm();
      formikHelpers.setStatus({ success: false });
      formikHelpers.setErrors({ submit: err.message });
      formikHelpers.setSubmitting(false);
    }
  }

  return (
    <Page title="Formulario Covid">

      <h1> Formulario de Covid </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values,
        }) => (
        <form onSubmit={handleSubmit}>

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={10}
              md={10}
              xs={12}
            >

              <Card>
                <CardContent>
                  
                  {/* <Box marginY={1} >
                    <TextField
                      autoComplete='off'
                      // error={Boolean(touched.name && errors.name)}
                      fullWidth
                      // helperText={touched.name && errors.name}
                      label="Nombre del Producto"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // value={values.name}
                      variant="outlined"
                    />
                  </Box> */}

                  <Box marginY={1} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Fecha de muestra"
                          inputFormat="MM/dd/yyyy"
                          value={values.fecha_muestra}
                          onChange={value => setFieldValue('fecha_muestra', value)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>

                    <FormHelperText error>
                      {errors.fecha_muestra}
                    </FormHelperText>
                  </Box>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.correo_electronico && errors.correo_electronico)}
                          fullWidth
                          helperText={touched.correo_electronico && errors.correo_electronico}
                          label="Correo Electronico"
                          name="correo_electronico"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.correo_electronico}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.nombre_paciente && errors.nombre_paciente)}
                          fullWidth
                          helperText={touched.nombre_paciente && errors.nombre_paciente}
                          label="Nombre"
                          name="nombre_paciente"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.nombre_paciente}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.primer_apellido_paciente && errors.primer_apellido_paciente)}
                          fullWidth
                          helperText={touched.primer_apellido_paciente && errors.primer_apellido_paciente}
                          label="Primer Apellido"
                          name="primer_apellido_paciente"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.primer_apellido_paciente}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.segundo_apellido_paciente && errors.segundo_apellido_paciente)}
                          fullWidth
                          helperText={touched.segundo_apellido_paciente && errors.segundo_apellido_paciente}
                          label="Segundo Apellido"
                          name="segundo_apellido_paciente"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.segundo_apellido_paciente}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="sucursal"
                          options={sucursales}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('sucursal', value) }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="sucursal"
                              variant="outlined"
                              label="Selecciona una sucursal"
                              error={Boolean(touched.sucursal && errors.sucursal?.label)}
                              helperText={touched.sucursal && errors.sucursal?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="nacionalidad"
                          options={paises}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('nacionalidad', value) }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="nacionalidad"
                              variant="outlined"
                              label="Selecciona nacionalidad"
                              error={Boolean(touched.nacionalidad && errors.nacionalidad?.label)}
                              helperText={touched.nacionalidad && errors.nacionalidad?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.identificacion && errors.identificacion)}
                          fullWidth
                          helperText={touched.identificacion && errors.identificacion}
                          label="Identificación"
                          name="identificacion"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.identificacion}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="tipo_identificacion"
                          options={tiposIdentificacion}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('tipo_identificacion', value) }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="tipo_identificacion"
                              variant="outlined"
                              label="Tipo de identificación"
                              error={Boolean(touched.tipo_identificacion && errors.tipo_identificacion?.label)}
                              helperText={touched.tipo_identificacion && errors.tipo_identificacion?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.edad && errors.edad)}
                          fullWidth
                          helperText={touched.edad && errors.edad}
                          label="Edad"
                          name="edad"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.edad}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.telefono && errors.telefono)}
                          fullWidth
                          helperText={touched.telefono && errors.telefono}
                          label="Teléfono"
                          name="telefono"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.telefono}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.telefono_adicional && errors.telefono_adicional)}
                          fullWidth
                          helperText={touched.telefono_adicional && errors.telefono_adicional}
                          label="Teléfono Adicional"
                          name="telefono_adicional"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.telefono_adicional}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.ocupacion && errors.ocupacion)}
                          fullWidth
                          helperText={touched.ocupacion && errors.ocupacion}
                          label="Ocupación"
                          name="ocupacion"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.ocupacion}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.lugar_trabajo && errors.lugar_trabajo)}
                          fullWidth
                          helperText={touched.lugar_trabajo && errors.lugar_trabajo}
                          label="Lugar de Trabajo"
                          name="lugar_trabajo"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lugar_trabajo}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="genero"
                          options={generos}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('genero', value) }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="genero"
                              variant="outlined"
                              label="Selecciona un genero"
                              error={Boolean(touched.genero && errors.genero?.label)}
                              helperText={touched.genero && errors.genero?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="provincia"
                          options={provincias}
                          getOptionLabel={(option) => option.label}
                          itemID="id"
                          onBlur={handleBlur}
                          onChange={(e, value) => {
                            if(value) setIdProvincia(value.id);
                            setFieldValue('provincia', value)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="provincia"
                              variant="outlined"
                              label="Selecciona una provincia"
                              error={Boolean(touched.provincia && errors.provincia?.label)}
                              helperText={touched.provincia && errors.provincia?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="canton"
                          key={idProvincia} // Esto reinica el autocomplete
                          options={cantones}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          noOptionsText={ idProvincia ? 'No encontrado' : 'Selecciona una provincia primero' }
                          onChange={(e, value) => {
                            if(value) setIdCanton(value.id);
                            setFieldValue('canton', value) 
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="canton"
                              variant="outlined"
                              label="Selecciona un canton"
                              error={Boolean(touched.canton && errors.canton?.label)}
                              helperText={touched.canton && errors.canton?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="distrito"
                          key={idCanton} // Esto reinica el autocomplete
                          options={distritos}
                          noOptionsText={ idCanton ? 'No encontrado' : 'Selecciona un canton primero' }
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('distrito', value) }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="distrito"
                              variant="outlined"
                              label="Selecciona un distrito"
                              error={Boolean(touched.distrito && errors.distrito?.label)}
                              helperText={touched.distrito && errors.distrito?.label}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <TextField
                          autoComplete='off'
                          error={Boolean(touched.direccion_exacta && errors.direccion_exacta)}
                          fullWidth
                          helperText={touched.direccion_exacta && errors.direccion_exacta}
                          label="Dirección Exacta"
                          name="direccion_exacta"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.direccion_exacta}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          multiple
                          filterSelectedOptions
                          id="historial_clinico"
                          options={listaHistorial}
                          getOptionLabel={(option) => option.label}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('historial_clinico', value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="historial_clinico"
                              variant="outlined"
                              label="Historial clínico"
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <Autocomplete 
                          id="metodo_diagnostico"
                          options={metodoDiagnostico}
                          onBlur={handleBlur}
                          onChange={(e, value) => setFieldValue('metodo_diagnostico', value || '') }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              autoComplete='off'
                              name="metodo_diagnostico"
                              variant="outlined"
                              label="Selecciona un metodo diagnostico"
                              error={Boolean(touched.metodo_diagnostico && errors.metodo_diagnostico)}
                              helperText={touched.metodo_diagnostico && errors.metodo_diagnostico}
                              fullWidth                        
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box marginY={1} >
                    <Autocomplete 
                      id="motivo_prueba"
                      options={motivosPrueba}
                      onBlur={handleBlur}
                      onChange={(e, value) => setFieldValue('motivo_prueba', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoComplete='off'
                          name="motivo_prueba"
                          variant="outlined"
                          label="Motivo de realizar la prueba"
                          fullWidth                        
                        />
                      )}
                    />
                  </Box>

                  {values.motivo_prueba === motivoPrueba.VIAJE && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box marginY={1} >
                          <Autocomplete 
                            id="pais_destino"
                            options={paises}
                            getOptionLabel={(option) => option.label}
                            onBlur={handleBlur}
                            onChange={(e, value) => setFieldValue('pais_destino', value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                autoComplete='off'
                                name="pais_destino"
                                variant="outlined"
                                label="Selecciona el pais destino"
                                error={Boolean(touched.pais_destino && errors.pais_destino?.label)}
                                helperText={touched.pais_destino && errors.pais_destino?.label}
                                fullWidth                        
                              />
                            )}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box marginY={1} >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                                label="Fecha de viaje"
                                inputFormat="MM/dd/yyyy"
                                value={values.fecha_viaje}
                                onChange={value => setFieldValue('fecha_viaje', value)}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </Stack>
                          </LocalizationProvider>

                          <FormHelperText error>
                            {errors.fecha_viaje}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  <Box marginY={1} >
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={values.viaje_realizado}
                          onChange={handleChange}
                          value={values.viaje_realizado}
                          name="viaje_realizado"
                        />
                      )}
                      label="¿Ha realizado un viaje en los últimos 14 días?"
                    />
                  </Box>

                  {values.viaje_realizado && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box marginY={1} >
                          <Autocomplete 
                            id="lugar_visitado"
                            options={paises}
                            getOptionLabel={(option) => option.label}
                            onBlur={handleBlur}
                            onChange={(e, value) => setFieldValue('lugar_visitado', value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                autoComplete='off'
                                name="lugar_visitado"
                                variant="outlined"
                                label="Selecciona el lugar visitado"
                                error={Boolean(touched.lugar_visitado && errors.lugar_visitado?.label)}
                                helperText={touched.lugar_visitado && errors.lugar_visitado?.label}
                                fullWidth                        
                              />
                            )}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box marginY={1} >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                                label="Fecha de visita"
                                inputFormat="MM/dd/yyyy"
                                value={values.fecha_visita}
                                onChange={value => setFieldValue('fecha_visita', value)}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </Stack>
                          </LocalizationProvider>

                          <FormHelperText error>
                            {errors.fecha_visita}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  <Box marginY={1} >
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={values.contacto_caso_confirmado}
                          onChange={handleChange}
                          value={values.contacto_caso_confirmado}
                          name="contacto_caso_confirmado"
                        />
                      )}
                      label="¿Ha tenido contacto con caso confirmado por COVID-19?"
                    />
                  </Box>

                  {values.contacto_caso_confirmado && (
                    <>
                      <Grid container spacing={3} >
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.nombre_contacto_covid && errors.nombre_contacto_covid)}
                              fullWidth
                              helperText={touched.nombre_contacto_covid && errors.nombre_contacto_covid}
                              label="Nombre del contacto"
                              name="nombre_contacto_covid"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nombre_contacto_covid}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.tipo_contacto && errors.tipo_contacto)}
                              fullWidth
                              helperText={touched.tipo_contacto && errors.tipo_contacto}
                              label="Tipo de contacto"
                              name="tipo_contacto"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tipo_contacto}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Desde cuando"
                                  inputFormat="MM/dd/yyyy"
                                  value={values.fecha_primer_contacto}
                                  onChange={value => setFieldValue('fecha_primer_contacto', value)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>

                            <FormHelperText error>
                              {errors.fecha_primer_contacto}
                            </FormHelperText>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Hasta cuando"
                                  inputFormat="MM/dd/yyyy"
                                  value={values.fecha_ultimo_contacto}
                                  onChange={value => setFieldValue('fecha_ultimo_contacto', value)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>

                            <FormHelperText error>
                              {errors.fecha_ultimo_contacto}
                            </FormHelperText>
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  <Box marginY={1} >
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={values.presenta_sintomas}
                          onChange={handleChange}
                          value={values.presenta_sintomas}
                          name="presenta_sintomas"
                        />
                      )}
                      label="¿Presenta síntomas relacionados con el COVID-19?"
                    />
                  </Box>

                  {values.presenta_sintomas && (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <Autocomplete 
                              multiple
                              id="sintomas"
                              options={sintomas}
                              getOptionLabel={(option) => option.label}
                              onBlur={handleBlur}
                              onChange={(e, value) => setFieldValue('sintomas', value)}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  autoComplete='off'
                                  name="sintomas"
                                  variant="outlined"
                                  label="Selecciona Sintomas"
                                  fullWidth                        
                                />
                              )}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Fecha de inicio de síntomas"
                                  inputFormat="MM/dd/yyyy"
                                  value={values.fecha_inicio_sintomas}
                                  onChange={value => setFieldValue('fecha_inicio_sintomas', value)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>

                            <FormHelperText error>
                              {errors.fecha_inicio_sintomas}
                            </FormHelperText>
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} >
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.otros_sintomas && errors.otros_sintomas)}
                              fullWidth
                              helperText={touched.otros_sintomas && errors.otros_sintomas}
                              label="Otros síntomas"
                              name="otros_sintomas"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.otros_sintomas}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  )}
      
                </CardContent>
              </Card>

            </Grid>
          </Grid>     

          <Box mt={3}>
            {
              isLoading 
              ? <CircularProgress />
              : (
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  Crear
                </Button>
              )
            }
          </Box>       

        </form>
      )}
      </Formik>

    </Page>
  )
}