import { Container, Typography } from '@mui/material';

export const Banner = () => {
  return (
    <Container sx = {{bgcolor: 'dark-blue', height: '15vh'}}>
        <Typography variant="h2" sx={{ color: 'white', textAlign: 'center'}}>
            Celestial Bodies
        </Typography>
    </Container>
  );
}

