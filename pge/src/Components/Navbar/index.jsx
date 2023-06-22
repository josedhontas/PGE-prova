import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ boxShadow: 'none' }}>
          <Box sx={{ mr: 4 }}>
            <Button color="inherit" sx={{ color: 'black' }}>Login</Button>
          </Box>
          <Button color="inherit" sx={{ color: 'green' }} variant="outlined">Cadastrar</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
