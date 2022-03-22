import { useState, useEffect } from 'react';

import { 
  Stack,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
  FormHelperText,
  Button,
  Autocomplete,
  FormControlLabel,
  Checkbox ,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { Formik, FormikHelpers } from 'formik';
import { format } from 'date-fns'

import { IInitialValues, initialValues } from '../utils/initialValues';
import { metodoDiagnostico } from '../data/metodoDiagnostico';
import { motivosPrueba, motivoPrueba } from '../data/motivoPrueba';
import { Page } from '../components/Page';
import { useDirection } from '../hooks/useDirection';
import { usehistorialClinico } from '../hooks/usehistorialClinico';
import { usePaises } from '../hooks/usePaises';
import { useSintoma } from '../hooks/useSintoma';
import { useSucursales } from '../hooks/useSucursales';
import { useTipoIdentificacion } from '../hooks/useTipoIdentificacion';
import { validationSchema } from '../utils/validationSchema';
import { generos } from '../data/generos';
import { formattedDate } from '../utils/constant';
import { Tutores } from '../data/tutor';
import { postDataToSend } from '../services/postDataToSend';
import { isEmptyObject } from '../helper/isEmptyObject';

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

  useEffect(() => {
    if(idProvincia) onSelectProvincia(idProvincia)
  }, [idProvincia])

  useEffect(() => {
    if(idCanton) onSelectCanton(idCanton)
  }, [idCanton])

  const onSubmit: any = async (values: IInitialValues, formikHelpers: FormikHelpers<{}>) => {
    try {

      // console.log(values)
      // debugger;
      /** Fechas opcionales */
      const fecha_visita_format = values.fecha_visita ? format( values.fecha_visita as Date, formattedDate ) : "";
      const fecha_primer_contacto_format = values.fecha_primer_contacto ? format( values.fecha_primer_contacto as Date, formattedDate ) : "";
      const fecha_ultimo_contacto_format = values.fecha_ultimo_contacto ? format( values.fecha_ultimo_contacto as Date, formattedDate ) : "";
      const fecha_inicio_sintomas_format = values.fecha_inicio_sintomas ? format( values.fecha_inicio_sintomas as Date, formattedDate ) : "";
      const fecha_viaje_format = values.fecha_viaje ? format( values.fecha_viaje as Date, formattedDate ) : "";
      
      /** Fechas obligatoria */
      const fecha_muestra_format = format( values.fecha_muestra as Date, formattedDate );
      const fecha_nacimiento_format = format( values.fecha_nacimiento as Date, formattedDate );
      
      const historial_clinico = values.historial_clinico.map(item => item.value);
      const sintomas = values.sintomas.map(item => item.value);

      const lugar_visitado = values.lugar_visitado.value ? values.lugar_visitado.value.split('-')[0] : ""; 
      const pais_destino = values.pais_destino.value ? values.pais_destino.value.split('-')[0]: "";

      const dataToSend = {
        identificacion: values.identificacion,
        tipo_identificacion: values.tipo_identificacion.id,
        nombre_paciente: values.nombre_paciente,
        primer_apellido_paciente: values.primer_apellido_paciente,
        segundo_apellido_paciente: values.segundo_apellido_paciente,
        nacionalidad: values.nacionalidad.id,
        correo_electronico: values.correo_electronico,
        sucursal: values.sucursal.id,
        codigo_provincia: values.provincia.id,
        codigo_canton: values.canton.id,
        codigo_distrito: values.distrito.id,
        direccion_exacta: values.direccion_exacta,
        genero: values.genero.value,
        fecha_nacimiento: fecha_nacimiento_format,
        edad: values.edad,
        telefono: values.telefono,
        telefono_adicional: values.telefono_adicional,
        ocupacion: values.ocupacion,
        lugar_trabajo: values.lugar_trabajo,
        contacto_con_caso: values.contacto_caso_confirmado ? 1 : 0,
        nombre_contacto_covid: values.nombre_contacto_covid,
        tipo_contacto: values.tipo_contacto,
        fecha_primer_contacto: fecha_primer_contacto_format,
        fecha_ultimo_contacto: fecha_ultimo_contacto_format,
        viaje_realizado: values.viaje_realizado ? 1 : 0,
        lugar_visitado: lugar_visitado,
        fecha_visita: fecha_visita_format,
        presenta_sintomas: values.presenta_sintomas ? 1 : 0,
        sintomas: sintomas.toString(),
        otros_sintomas: values.otros_sintomas,
        historial_clinico: historial_clinico.toString(),
        motivo: values.motivo_prueba,
        lugar_destino: pais_destino,
        fecha_salida: fecha_viaje_format,
        embarazo: values.estado_embarazo ? 1 : 0,
        semanas_embarazo: values.semanas_embarazo ? values.semanas_embarazo : 0,
        tipo_tutor: values.tutor_type,
        identificacion_tutor: values.tutor_identificacion,
        tipo_identificacion_tutor: values.tutor_tipo_identificacion.id,
        nombre_tutor: values.tutor_nomber,
        primer_apellido_tutor: values.tutor_primer_apellido,
        segundo_apellido_tutor: values.tutor_segundo_apellido,
        fecha_muestra: fecha_muestra_format,
        metodo: values.metodo_diagnostico,
        fecha_primer_sintoma: fecha_inicio_sintomas_format,
        // codigo_barrio: ,
        // fecha_creacion: "2022-03-16T16:05:23.692Z",
        // resultado: "string",
        // fecha_resultado: "2022-03-16T16:05:23.692Z",
        // id_region: ,
        // id_area: 0,
        // signos: "string",
        // muerto_servicio_salud: 0,
        // hisopo_nasofarigeno: 0,
        // aspirado_nasofarigeno: 0,
        // analisis_solicitado: "string",
        // codigo_evento: "string",
        // codigo_lugar: "string",
        // fecha_evento: "2022-03-16T16:05:23.692Z",
        // hospitalizado: 0,
        // muestra_enviada: 0,
        // resultado_enviado: 0
      }
      console.log(dataToSend)
      
      const response = await postDataToSend(dataToSend)
      console.log({response})
      
    } catch (err: any) {
      console.log(err)
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
                          type="number"
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

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box marginY={1} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="Fecha de nacimiento"
                              inputFormat="MM/dd/yyyy"
                              value={values.fecha_nacimiento}
                              onChange={value => setFieldValue('fecha_nacimiento', value)}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>

                        <FormHelperText error>
                          {errors.fecha_nacimiento}
                        </FormHelperText>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                    </Grid>
                  </Grid>

                  {(Boolean(touched.edad) && values.edad) < 18 && (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <Autocomplete 
                              id="tutor_type"
                              options={Tutores}
                              onBlur={handleBlur}
                              onChange={(e, value) => setFieldValue('tutor_type', value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  autoComplete='off'
                                  name="tutor_type"
                                  variant="outlined"
                                  label="Tipo de identificación del tutor"
                                  error={Boolean(touched.tutor_type && errors.tutor_type)}
                                  helperText={touched.tutor_type && errors.tutor_type}
                                  fullWidth                        
                                />
                              )}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <Autocomplete 
                              id="tutor_tipo_identificacion"
                              options={tiposIdentificacion}
                              getOptionLabel={(option) => option.label}
                              onBlur={handleBlur}
                              onChange={(e, value) => setFieldValue('tutor_tipo_identificacion', value) }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  autoComplete='off'
                                  name="tutor_tipo_identificacion"
                                  variant="outlined"
                                  label="Tipo de identificación"
                                  error={Boolean(touched.tutor_tipo_identificacion && errors.tutor_tipo_identificacion?.label)}
                                  helperText={touched.tutor_tipo_identificacion && errors.tutor_tipo_identificacion?.label}
                                  fullWidth                        
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.tutor_identificacion && errors.tutor_identificacion)}
                              fullWidth
                              helperText={touched.tutor_identificacion && errors.tutor_identificacion}
                              label="Identificación Tutor"
                              name="tutor_identificacion"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tutor_identificacion}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.tutor_nomber && errors.tutor_nomber)}
                              fullWidth
                              helperText={touched.tutor_nomber && errors.tutor_nomber}
                              label="Nombre Tutor"
                              name="tutor_nomber"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tutor_nomber}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.tutor_primer_apellido && errors.tutor_primer_apellido)}
                              fullWidth
                              helperText={touched.tutor_primer_apellido && errors.tutor_primer_apellido}
                              label="Primer apellido Tutor"
                              name="tutor_primer_apellido"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tutor_primer_apellido}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.tutor_segundo_apellido && errors.tutor_segundo_apellido)}
                              fullWidth
                              helperText={touched.tutor_segundo_apellido && errors.tutor_segundo_apellido}
                              label="Segundo apellido Tutor"
                              name="tutor_segundo_apellido"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tutor_segundo_apellido}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  )}

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
                                  error={Boolean(values.sintomas.length < 1)}
                                  helperText={values.sintomas.length < 1 ? 'Sintomas es requerido' : ''}             
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

                  <Box marginY={1} >
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={values.estado_embarazo}
                          onChange={handleChange}
                          value={values.estado_embarazo}
                          name="estado_embarazo"
                        />
                      )}
                      label="¿Se encuentra embarazada?"
                    />
                  </Box>

                  {values.estado_embarazo && (
                    <>
                      <Grid container spacing={3} >
                        <Grid item xs={12} md={6}>
                          <Box marginY={1} >
                            <TextField
                              autoComplete='off'
                              error={Boolean(touched.semanas_embarazo && errors.semanas_embarazo)}
                              fullWidth
                              helperText={touched.semanas_embarazo && errors.semanas_embarazo}
                              label="Semanas de embarazo"
                              name="semanas_embarazo"
                              type="number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.semanas_embarazo}
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
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                  >
                    Crear
                  </Button>

                  {
                    !isEmptyObject(errors) && (
                      <FormHelperText error>
                        Hay algunos errores en el formulario
                      </FormHelperText>
                    )
                  }
                
                </>
              )
            }
          </Box>       
        </form>
      )}
      </Formik>

    </Page>
  )
}