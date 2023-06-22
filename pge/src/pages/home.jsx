import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import inicio from '../img/inicio.png'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ height: '100vh' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box textAlign="center">
            <img src={inicio} alt="Logo" width="200" />
            <h1>Seja bem-vindo!</h1>
            <p>Só Deus sabe</p>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
