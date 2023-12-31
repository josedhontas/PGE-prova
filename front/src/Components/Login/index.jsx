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
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Falha from '../falha';

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

export default function Login(props) {
  const navigate = useNavigate();
  const { onClose, setUsuarioData } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [falha, setFalha] = React.useState(false);


  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSaveChanges = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Email inválido');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Senha inválida');
      return;
    }

    fetch('http://localhost:5000/usuario/autenticar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setEmailError(' ');
        setPasswordError(' ');
        setFalha(true);
        throw new Error('Falha na autenticação');
      }
    })
    .then(data => {
      setUsuarioData(data);
      navigate('/entrada');
    })
    .catch(error => {
      console.error(error);
    });    
  };

  const handleEmailBlur = (event) => {
    const { value } = event.target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);

    if (value.length === 0) {
      setPasswordError('');
    } else if (value.length < 8) {
      setPasswordError('Senha deve ter no mínimo 8 caracteres');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
         Login
        </BootstrapDialogTitle>

        {falha && <Falha messagem={"Email ou senha incorreta"}></Falha>}
        <DialogContent dividers>
          <TextField
            label="Email"
            type="email"
            value={email}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges} color="inherit" sx={{ color: 'black' }} variant="outlined">
            Login
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
