import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Tema from './Tema'; 
import { Paper } from '@mui/material';
import Automobili from './Automobili';
const Dodavanje = ({ dodajPodatak ,rows})=>{
    const[model,setModel] = React.useState('');
    const[cena,setCena] = React.useState(0);
    const[godiste,setGodiste] = React.useState(0);
    const[klima,setKlima] = React.useState(true);
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
      const DodajAuto=()=>{
      
        
        let auto = {model:model,cena:parseInt(cena),godiste:parseInt(godiste),klima:klima};
        dodajPodatak(auto)
        
      };
    return <Box component="section" sx={{ p: 2}} >  
     <Paper elevation={5} style={{padding:20}}>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput size="small" onChange={PromenaModela}/>
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
        <Button variant="outlined" onClick={DodajAuto}  startIcon={<SpeedDialIcon  />} style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white }}>
                Dodaj
                </Button>
                </Paper>
        </Box>

    
};
export default Dodavanje;