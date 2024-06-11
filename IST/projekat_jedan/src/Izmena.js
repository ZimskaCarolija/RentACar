import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Tema from './Tema'; 
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import {  getAutomobili , IzmeniAutomobilF} from  './Automobili'
const IzmeniAutomobil = ()=>{
    const location = useLocation();
  const auto = location.state?.auto;
  console.log(auto)
  const [snackBarOtovren, setSnackbarOtvoren] = useState(false);
    const [snackbarPoruka, setSnackbarPoruka] = useState('');
    const snackBarZatvori = () => {
        setSnackbarOtvoren(false);
      };
    const[model,setModel] = React.useState(auto.model);
    const[cena,setCena] = React.useState(auto.cena);
    const[godiste,setGodiste] = React.useState(auto.godiste);
    const[klima,setKlima] = React.useState(auto.klima);
    const PromenaModela = (event) => {
        setModel(event.target.value);
      };
      const PromenaCene = (event) => {
        setCena(event.target.value);
      };
      const PromenaGodiste = (event) => {
        setGodiste(event.target.value);
      };
      const PromenaKlima = (event) => {
        setKlima(event.target.checked);
      };
      const IzmeniAuto=async ()=>{
       let id = auto._id;
       let autoD = {_id:id,model:model,cena:cena,godiste:godiste,klima:klima};
        await IzmeniAutomobilF(id,autoD);
        setSnackbarPoruka("Automobil sa id : "+id+" je uspesno izmenjen");
        setSnackbarOtvoren(true);
      };
    return <Box component="section" sx={{ p: 2}} >  
     <Paper elevation={5} style={{padding:20}}>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput size="small" onChange={PromenaModela} value={model}/>
            <FormHelperText id="outlined-weight-helper-text">Model</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput size="small" type="number" value={cena}onChange={PromenaCene}/>
            <FormHelperText id="outlined-weight-helper-text">Cena</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput size="small" type="number"  value={godiste} onChange={PromenaGodiste}/>
            <FormHelperText id="outlined-weight-helper-text">Godiste</FormHelperText>
        </FormControl>


        <FormControlLabel control={<Checkbox checked={klima} style={{margin:7}} onChange={PromenaKlima}/> } label="Klima" />
        <Button variant="outlined" onClick={IzmeniAuto}  startIcon={<CheckIcon  />} style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>
                Sacuvaj
                </Button>
                </Paper>
                <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackBarOtovren}
          onClose={snackBarZatvori}
          message={snackbarPoruka}
          autoHideDuration={1200} 
        />
        </Box>
        
    
};
export default IzmeniAutomobil;