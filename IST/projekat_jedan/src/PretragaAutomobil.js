import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import Tema from './Tema';
import { Pretraga } from './Automobili';
const PretragaKomponenta = ({setNiz,Od,Do})=>{

  console.log("Nizu  pretragi je : ");
  console.log(setNiz);
    const [stringPretraga,setPretraga] = React.useState("");
    const PromenaPretraga = (event) => {
        setPretraga(event.target.value);
      };
      const PretragaFja=async()=>{
        let niz = await Pretraga(stringPretraga,Od,Do)
        setNiz(niz)
  
      }
      return(
        <Box component="section" sx={{ p: 2}} >  
        <Paper elevation={5} style={{padding:20}}>
            <OutlinedInput size="small" onChange={PromenaPretraga} value={stringPretraga} style={{margin:10}}/>
        <Button variant="outlined"  onClick={PretragaFja}  style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white, margin:10 }}>
                Pretrazi
        </Button>
        </Paper>
        </Box>)
 
}
export default PretragaKomponenta;