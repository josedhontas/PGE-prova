import React from 'react';
import PropTypes from 'prop-types';
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

export default function Processo(props) {
  const { onClose, processoJuridico } = props;
  const [enviar, setEnviar] = useState(false);  

  const handleClose = () => {
    if (onClose) {
      onClose();
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
         Processo
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
            InputProps={{
                readOnly: true,
              }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
