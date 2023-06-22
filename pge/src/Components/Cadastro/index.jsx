import * as React from 'react';
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
  const [cargo, setCargo] = React.useState('');

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSaveChanges = () => {
    console.log(nome);
    console.log(email);
    console.log(password);
    console.log(cargo);
    //handleClose();
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCargoChange = (event) => {
    setCargo(event.target.value);
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
        <DialogContent dividers>
          <TextField
            label="Nome"
            value={nome}
            onChange={handleNomeChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
            <FormControlLabel value="false" control={<Radio />} label="Acessor" />
          </RadioGroup>
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
