import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Tabela from './Tabela';
import Dodavanje from './Dodavanje';
import Vozila from './Vozila';
import Meni from './Meni';
import { ThemeProvider } from '@mui/material/styles';
import Tema from './Tema';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <ThemeProvider theme={Tema}>
    <Meni/>
    
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
