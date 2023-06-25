import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Falha from '../falha';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.nome,
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Enviar(props) {
  const { onClose, processoJuridico } = props;
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [enviar, setEnviar] = useState(false);
  const [falha, setFalha] = useState(false);

  console.log(processoJuridico)

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/usuario/${processoJuridico.idUsuario}`);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSaveChanges = () => {
    if (selectedOption === null) {
      return 
    }

    const enviar = {
      idOrigem: processoJuridico.idUsuario,
      idDestino: selectedOption.id,
      idProcesso: processoJuridico.idProcesso

    };

    fetch('http://localhost:8000/usuario/enviar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enviar),
    }).then(response => {
      if (response.status === 401) {
        throw new Error('Usuário já cadastrado com esse email');
      }
      return response.json();
    })
      .then(data => {
        console.log('Sucesso:', data);
        setEnviar(true);
      })
      .catch(error => {
        console.error('Falhou:', error);
        setEnviar(false);
        setFalha(true);
      });
  };

  const handleOptionChange = (event, value) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Enviar processo
        </BootstrapDialogTitle>
        {falha && <Falha messagem={"Processo já enviado"}></Falha>}
        {enviar && <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEnviar(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Processo enviado
        </Alert>}
        <DialogContent dividers>
          <Autocomplete
            id="filter-demo"
            options={options}
            getOptionLabel={(option) => option.nome}
            filterOptions={filterOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Destinatário" />}
            noOptionsText="Nenhuma opção encontrada"
            value={selectedOption}
            onChange={handleOptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges}>
            Enviar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
