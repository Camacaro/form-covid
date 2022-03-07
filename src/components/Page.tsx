import { forwardRef } from 'react';
import { Fade, Box, Container, SxProps, Theme } from '@mui/material';
import { Helmet } from 'react-helmet';

const stylePage: SxProps<Theme> = [
  (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  })
]

export const Page = forwardRef(({
  children,
  title,
}: any, ref) => {
  
  return (
    <Fade timeout={500} in={true}>
      <Box sx={stylePage} ref={ref} >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Container maxWidth="lg">
          {children}
        </Container>
      </Box >
    </Fade>
  );
});