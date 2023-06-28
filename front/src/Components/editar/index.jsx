import React from 'react';
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
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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

export default function Editar(props) {
  const { onClose, processoJuridico } = props;
  const [descricao, setDescricao] = useState('');
  const [descricaoError, setdescricaoError] = useState('');
  const [enviar, setEnviar] = useState(false);
  //console.log(processoJuridico)

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSaveChanges = () => {
    const processoData = {
      numero: processoJuridico.numero,
      descricao: descricao

    };
    console.log(processoData)

    fetch(`http://localhost:5000/juridico/${processoJuridico.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processoData),
    })

    setEnviar(true);
  }

  const handleDescricaoChange = (event) => {
    const { value } = event.target;
    setDescricao(value);

    if (value.length === 0) {
      setdescricaoError('');
    } else if (value.length < 12) {
      setdescricaoError('Desrição pequena demais');
    } else {
      setdescricaoError('');
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         Editar
        </BootstrapDialogTitle>
        {enviar &&         <Alert
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
          Processo editado
        </Alert>}
        <DialogContent dividers>
          <TextField
            label="Número"
            type="text"
            fullWidth
            defaultValue={processoJuridico.numero}
          InputProps={{
            readOnly: true,
          }}
            margin="normal"
          />
          <TextField
            label="Descrição"
            type="text"
            defaultValue={processoJuridico.descricao}
            onChange={handleDescricaoChange}
            error={!!descricaoError}
            helperText={descricaoError}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges}>
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
