import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Editar from '../editar';
import Enviar from '../enviar';
import Sucesso from '../sucesso';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Entrada({ usuarioData }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editar, setEditar] = useState(false);
  const [enviar, setEnviar] = useState(false);
  const [processo, setProcesso] = useState();
  const [enviarDados, setEnviarDados] = useState();
  const [messagem, setMessagem] = useState('');
  const [sucesso, setSucesso] = useState(false);


  const handleCloseDialog = () => {
    setEditar(false);
    setEnviar(false)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleMenuItemClick = (row, option) => {
    //console.log(row)
    handleMenuClose();

    const userData = {
      idUsuario: usuarioData.id,
      idProcesso: row.id

    };

    if (option === 'Arquivar') {

      fetch('http://localhost:8000/usuario/arquivar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      setMessagem("Processo arquivado");
      setSucesso(true);
    }


    if (option === 'Excluir') {

      fetch('http://localhost:8000/usuario/excluir', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      setMessagem("Processo excluido");
      setSucesso(true);
    }

    if (option === 'Editar') {
      setEditar(true);
      setProcesso(row)
    }

    if (option === 'Enviar') {
      setEnviar(true)
      setEnviarDados(userData)
      setProcesso(row)
      console.log("ta funcionando")

    }

    getDados();

  };

  useEffect(() => {
    getDados();
  }, [data]);



  const getDados = () => {
    axios
      .get(`http://localhost:8000/usuario/entrada/${usuarioData.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 400 }} aria-label="personalizado">
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.numero}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.descricao}
                </TableCell>
                <TableCell>
                </TableCell>
                <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`menu-${row.id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedRowId === row.id}
                  onClose={handleMenuClose}
                >
                  {usuarioData.cargo ? (
                    <>
                      <MenuItem onClick={() => handleMenuItemClick(row, 'Excluir')}>
                        Excluir
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick(row, 'Editar')}>
                        Editar
                      </MenuItem>
                    </>
                  ) : null}
                  <MenuItem onClick={() => handleMenuItemClick(row, 'Arquivar')}>
                    Arquivar
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick(row, 'Enviar')}>
                    Enviar
                  </MenuItem>
                </Menu>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : 'tudo'}`
                }
                rowsPerPageOptions={[5, 10, 25, { label: 'Tudo', value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Processos por página"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {editar && <Editar onClose={handleCloseDialog} processoJuridico={processo} />}
      {enviar && <Enviar onClose={handleCloseDialog} processoJuridico={enviarDados} />}
      {sucesso && <Sucesso messagem={messagem}></Sucesso>}
    </>
  );
}
