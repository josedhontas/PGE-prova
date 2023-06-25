import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import inicio from '../img/inicio.png'

export default function Inicio({ setUsuarioData }) {
  return (
    <div>
      <Navbar setUsuarioData={setUsuarioData} />
      <Container maxWidth="sm" sx={{ height: '100vh' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box textAlign="center">
            <img src={inicio} alt="Logo" width="250" />
            <h1>
              <span style={{ color: '#212121' }}>Agilize os </span>
              <span style={{ color: '#2f80ed' }}>processos jurídicos</span>
            </h1>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
