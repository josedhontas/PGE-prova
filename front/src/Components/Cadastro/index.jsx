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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

export default function Cadastro(props) {
  const { onClose } = props;
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cargo, setCargo] = React.useState('false');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [nomeError, setNomeError] = React.useState('');
  const [sucesso, setSucesso] = React.useState(false);

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

    if(!nome.trim()){
      setNomeError('O campo Nome é obrigatório')
      return;
    }

    if (password.length < 8) {
      setPasswordError('Senha inválida');
      return;
    }
    /*console.log(nome);
    console.log(email);
    console.log(password);
    console.log(cargo);*/
    const userData = {
      nome: nome,
      email: email,
      senha: password,
      cargo: cargo
    };

    fetch('http://localhost:5000/usuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (response.status === 400) {
        setEmailError('Email em uso')
        throw new Error('Usuário já cadastrado com esse email');
      }
      return response.json();
    })
    .then(data => {
      console.log('Sucesso:', data);
      setSucesso(true);
      //handleClose();
    })
      .catch(error => {
        console.error('Falhou:', error);
      });
  };

  const handleNomeChange = (event) => {
    const { value } = event.target;
    setNome(value);

    if (!value.trim()) {
      setNomeError('O campo Nome é obrigatório');
    } else {
      setNomeError('');
    }
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
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

  const handleCargoChange = (event) => {
    const { value } = event.target;
    setCargo(JSON.parse(value));
  };
  

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cadastro
        </BootstrapDialogTitle>
        {sucesso &&         <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSucesso(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Usuário cadastrado com sucesso!
        </Alert>}
        <DialogContent dividers>
          <TextField
            label="Nome"
            value={nome}
            onChange={handleNomeChange}
            error={!!nomeError}
            helperText={nomeError}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
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
          <RadioGroup
            value={cargo}
            onChange={handleCargoChange}
            aria-label="cargo"
            name="cargo"
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Procurador" />
            <FormControlLabel value="false" control={<Radio />} label="Assessor" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges} color="inherit" sx={{ color: 'green' }} variant="outlined">
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
