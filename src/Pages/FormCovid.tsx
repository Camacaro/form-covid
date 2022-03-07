import { Box, Card, CardContent, Grid, TextField, CircularProgress, FormHelperText, Button, Autocomplete } from '@mui/material';
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
import { useState } from 'react';
import { format } from 'date-fns'

const initialValues = {
  fecha_muestra: new Date(),

  // // infoDireccion
  // codigo_provincia: '',
  // codigo_canton: '',
  // codigo_distrito: '',
  // direccion_exacta: '',

  // // infoPersonal
  nombre_paciente: '',
  primer_apellido_paciente: '',
  segundo_apellido_paciente: '',
  correo_electronico: '',
  edad: '',
  // sucursal: '',
  // nacionalidad: '',
  // tipo_identificacion: '',
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
  // viaje_realizado: false,
  // lugar_visitado: '',
  // fecha_visita: '',

  // // contactoCaso 
  // contacto_caso_confirmado: false,
  // nombre_contacto_covid: '',
  // tipo_contacto: '',
  // fecha_primer_contacto: '',
  // fecha_ultimo_contacto: '',

  // // sintomas
  // presenta_sintomas: '',
  // sintomas: [],
  // fecha_inicio_sintomas: '',
  // otros_sintomas: '',

  // // estadoEmbarazo
  // estado_embarazo: '',
  // semanas_embarazo: '',
}

const validationSchema = Yup.object().shape({
  fecha_muestra: Yup.date().required('Fecha de muestra es requerida'),
  correo_electronico: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  nombre_paciente: Yup.string().required('Nombre es requerido'),
  primer_apellido_paciente: Yup.string().required('Primer apellido es requerido'),
  segundo_apellido_paciente: Yup.string().required('Segundo apellido es requerido'),
  identificacion: Yup.string().required('Identificación es requerido'),
  telefono: Yup.string().required('Teléfono es requerido'),
  telefono_adicional: Yup.string().required('Teléfono adicional es requerido'),
  ocupacion: Yup.string().required('Ocupación es requerido'),
  lugar_trabajo: Yup.string().required('Lugar de trabajo es requerido'),
  genero: Yup.object({
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
  const [isLoading, setIsLoading] = useState(false)
  // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  // const handleChange = (newValue: any) => {
  //   setValue(newValue);
  // };

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
                  </Grid>

                  <Grid container spacing={3} >
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
                  </Grid>

                  <Grid container spacing={3} >
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
                  </Grid>

                  <Grid container spacing={3} >
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

                    {/* <Grid item xs={12} md={6}>
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
                    </Grid> */}
                  </Grid>
      
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