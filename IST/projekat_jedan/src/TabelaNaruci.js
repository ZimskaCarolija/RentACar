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
import {FIltirajDatum} from './Automobili';
import { Checkbox } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Tema from './Tema';  
import CheckIcon from '@mui/icons-material/Check';  
import { UzmiProsecnuOcenu } from './Uzimanja'
import Rating from '@mui/material/Rating';
import PretragaKomponenta from './PretragaAutomobil'
import { useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import { FIltirajDatumObrnuto } from './Automobili';
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



 function Tabela({odabir,datumOd,datumDo}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 // const[DobriRevodi,setDobriRevodi] = React.useState(FIltirajDatum(datumOd, datumDo) || [])
 const[rows,setRows] = React.useState([])
 const[Zauzeti,setZauzeti] = React.useState([])
 const [open, setOpen] = React.useState(false);
 const ZauzetiAutomobili = async()=>{
  let AutomobiliZ = await FIltirajDatumObrnuto(datumOd,datumDo)
  setZauzeti(AutomobiliZ)
  handleClickOpen()
 }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);

    };
 useEffect(() => {
  const fetchAutomobili = async () => {
    try {
      const automobili = await FIltirajDatum(datumOd,datumDo);
      console.log(automobili);
      setRows(automobili)
    } catch (err) {
      console.log(err);
    } finally {
      console.log(false);
    }
  }
  fetchAutomobili();
 },[datumOd, datumDo]);





  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const POstaviRedovei = (niz)=>{
    console.log("NIZZZZ je ")
    setRows(niz);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component="section" sx={{ p: 2}}>
        <Button variant="outlined"  onClick={ZauzetiAutomobili} style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>
                Zauzeti Automobili
                </Button>
        <Box m={5}>Odaberite Auto</Box>
        <Box>
        <PretragaKomponenta  setNiz = {POstaviRedovei} Od={datumOd} Do={datumDo}/>
    <TableContainer component={Paper} elevation={5}>
      <Table sx={{ minWidth: 600 }} aria-label="Automobili">
      <TableHead>
          <TableRow >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Id</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Model</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Cena</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Godiste</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Ocena</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Klima</TableCell >
            <TableCell  align="left" style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>Odabir</TableCell >
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
  ? (rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)) // Dodajte proveru da li je rows definisan pre poziva slice
  : rows
).map((automobil) =>  (
            <TableRow key={automobil.id}>
               <TableCell style={{ width: 160 }} align="left">
                {automobil.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {automobil.model}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {automobil.cena}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {automobil.godiste}
              </TableCell>
              <TableCell style={{ width: 160, textAlign: 'left' }}>
              <Rating name="disabled" value={automobil.ProsecnaOcena} disabled />
                </TableCell>
              <TableCell style={{ width: 160, textAlign: 'left' }}>
            <Checkbox checked={automobil.klima} disabled />
                </TableCell>
                <TableCell style={{ width: 160, textAlign: 'left' }}>
            <Button variant="outlined" startIcon={<CheckIcon />}  onClick={() => odabir(automobil)} style={{ backgroundColor: Tema.palette.common.blackD, color: Tema.palette.common.whiteD }}>
                Odaberi
                </Button>
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
      <DialogTitle>Zauzeti Automobili</DialogTitle>
              {Zauzeti.map(el=>{
                return(<div>{"Model : "+el.model + " Godiste : " + el.godiste + " Cena :  " +el.cena +"  Do : "+ el.datumDo}</div>)
              })}
        </Box>
    </Dialog>
    </Box>
  );
}
export default Tabela