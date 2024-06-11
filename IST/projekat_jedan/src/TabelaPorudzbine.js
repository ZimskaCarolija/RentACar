import * as React from 'react';
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
import { Checkbox } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Tema from './Tema';  
import CheckIcon from '@mui/icons-material/Check';  
import {getUzimanja , izbaciUzimanja } from './Uzimanja';
import Automobili from './Automobili';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { VratiAuto } from './Uzimanja';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import PretragaNarudzbina from './PretrazicanejNarudzbina';
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
        aria-label="Prva strana"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Prosla strana"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Sledeca strana"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Poslednja strana"
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



 function TabelaPordzbine() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const[rows,setRows] = React.useState([])
    const [value, setValue] = React.useState(2);//Ocena
    const [Porudzbina, setPorudzbina] = React.useState({});//Id Porudzbina
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);

    };
    useEffect(() => {
      const fetchPorudzbine = async () => {
        try {
          const porudzbine = await getUzimanja();
          console.log(porudzbine);
          setRows(porudzbine||[])
        } catch (err) {
          console.log(err);
        } finally {
          console.log(false);
        }
      }
      fetchPorudzbine();
     },[]);
     const ProzorZaVracanje = async(porudzbina)=>{
      setPorudzbina(porudzbina) 
      handleClickOpen()
     }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Brisanje=async(id)=>{
    let Rezetvacije = await izbaciUzimanja(id);
    setRows(Rezetvacije);
  }
  const Vrati = async()=>
    {
      let porudzbineP = await VratiAuto(Porudzbina,value)
      setRows(porudzbineP)
      setOpen(false);
    }
  return (
    <Box component="section" sx={{ p: 2}}>
        <Box m={5}><PretragaNarudzbina PostaviRedove={setRows}/></Box>
        <Box m={5}>Porudzbine</Box>
        <Box>
    <TableContainer component={Paper} elevation={5}>
      <Table sx={{ minWidth: 600 }} aria-label="Automobili">
      <TableHead>
          <TableRow >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Model</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Datum Od</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Datum Do</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Ocena</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Telefon</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Ukupna Cena</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Cena Po Danu</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Brisanje</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Vrati</TableCell >
         </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
  ? (rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)) // Dodajte proveru da li je rows definisan pre poziva slice
  : rows
).map((uzeto) =>  (
            <TableRow key={uzeto.id}>
              <TableCell style={{ width: 160 }} align="left">
                {uzeto.model}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {uzeto.datumOd}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {uzeto.datumDo}
              </TableCell>
              <TableCell style={{ width: 160, textAlign: 'left' }}>
                <Rating name="disabled" value={uzeto.ocena} disabled />
                </TableCell>
              <TableCell style={{ width: 160, textAlign: 'left' }}>
                {uzeto.telefon}
                </TableCell>
                <TableCell style={{ width: 160, textAlign: 'left' }}>
                {uzeto.ukupnaCena}
                </TableCell>
                <TableCell style={{ width: 160, textAlign: 'left' }}>
                {uzeto.cenaPoDanu}
                </TableCell>
                <TableCell style={{ width: 160, textAlign: 'left' }}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>Brisanje(uzeto._id)}  style={{ backgroundColor: Tema.palette.common.blackT, color: Tema.palette.common.whiteT }}>
                Obrisi
                </Button>
                </TableCell>
                <TableCell style={{ width: 160, textAlign: 'left' }}>
                {!uzeto.ocena  ? (
              <Button
                variant="outlined"
                startIcon={<AssignmentReturnedIcon />}
                onClick={() => ProzorZaVracanje(uzeto)}
                style={{ backgroundColor: Tema.palette.common.blackD, color: Tema.palette.common.whiteD }}
              >
                Vrati 
              </Button>
            ) : <>Vec je Vraceno </>}
                </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
               rowsPerPageOptions={[5, 10, 25, { label: 'Svi', value: -1 }]}
               colSpan={3}
               count={rows.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               ActionsComponent={TablePaginationActions}
               style={{minWidth:500}}
               labelRowsPerPage="Po strani"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>



    <Dialog onClose={handleClose} open={open}>
    <Box style={{ textAlign: 'center', padding: '10px' }}>
      <DialogTitle>Ocenite i vratite Auto</DialogTitle>
               <div> <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          </div>
          <Button variant="outlined" onClick={Vrati} style={{ backgroundColor: Tema.palette.common.blackD, color: Tema.palette.common.whiteD }}>
               Vrati i Oceni
        </Button>
        </Box>
    </Dialog>



    </Box>

  );

}
export default TabelaPordzbine