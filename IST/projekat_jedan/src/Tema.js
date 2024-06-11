import {  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lime, purple } from '@mui/material/colors';
const  Tema = createTheme({
  palette: {

    common: {
      black: '#f06292',//basic boja
      white: '#fff3e0',
      blackD: '#ff6f00',//izmena
      whiteD: '#fff3e0',
      blackT: '#f50057',//brisanje
      whiteT: '#fff3e0',
    },
   
  },
});
export default Tema

