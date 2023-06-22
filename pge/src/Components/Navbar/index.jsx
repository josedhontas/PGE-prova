import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Login from '../Login';
import Cadastro from '../Cadastro';

export default function ButtonAppBar() {
  const [login, setLogin] = useState(false);
  const [cadastro, setCadastro] = useState(false);


  const handleLoginClick = () => {
    setLogin(true);
  };

  const handleCloseDialog = () => {
    setLogin(false);
    setCadastro(false);
  };

  const handleCadastroClick = () => {
    setCadastro(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ boxShadow: 'none' }}>
          <Box sx={{ mr: 4 }}>
            <Button color="inherit" sx={{ color: 'black' }} onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
          <Button color="inherit" sx={{ color: 'green' }} variant="outlined" onClick={handleCadastroClick}>
            Cadastrar
          </Button>
        </Toolbar>
      </AppBar>
      {login && <Login onClose={handleCloseDialog} />}
      {cadastro && <Cadastro onClose={handleCloseDialog} />}

    </Box>
  );
}
