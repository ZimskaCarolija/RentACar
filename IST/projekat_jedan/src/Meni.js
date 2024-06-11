import React from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import App from './App';
import Vozila from './Vozila';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Tema from './Tema';
import IzmeniAutomobil from './Izmena';
import Narucivanje from './Narucivanje';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Porudzbine from './Porudzbine';

const Meni = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/Vozila');
        break;
        case 2:
        navigate('/Narucivanje');
        break;
        case 3:
        navigate('/Porudzbine');
        break;
      default:
        break;
    }
  };

  return (
    <Box>
        <Paper elevation={5}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange} style={{ backgroundColor: Tema.palette.common.black }}
      >
        <BottomNavigationAction label="Pocetna" icon={<HomeIcon />} style={{color: Tema.palette.common.white}} />
        <BottomNavigationAction label="Vozila" icon={<TimeToLeaveIcon />} style={{color: Tema.palette.common.white}}/>
        <BottomNavigationAction label="Naruci" icon={<ShoppingCartIcon />} style={{color: Tema.palette.common.white}} />
        <BottomNavigationAction label="Narudzbine" icon={<ReceiptIcon />} style={{color: Tema.palette.common.white}}/>
      </BottomNavigation>
      </Paper>
    </Box>
  );
};

const AppWithRouter = () => {
  return (
    <BrowserRouter>
    <Meni />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Vozila' element={<Vozila/>} />
        <Route path="/Narucivanje" element={<Narucivanje />} />
        <Route path="/IzmeniAutomobil" element={<IzmeniAutomobil />} />
        <Route path="/Porudzbine" element={<Porudzbine />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default AppWithRouter;
