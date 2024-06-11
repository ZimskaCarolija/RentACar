import React, { useState,useEffect } from 'react';
import Dodavanje from "./Dodavanje";
import Tabela from './Tabela';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { izbaciAutomobil , getAutomobili , dodajAutomobil} from  './Automobili'
import Sortiranje from './MiniKomponente/sortiranje';
import { UzmiAuto } from './Automobili';
import axios from 'axios';
const Vozila = () => {
  const navigate = useNavigate();
  const [rows, setRedovi] = useState([]);
    const [snackBarOtovren, setSnackbarOtvoren] = useState(false);
    const [snackbarPoruka, setSnackbarPoruka] = useState('');

    useEffect(() => {
      const fetchAutomobili = async () => {
        try {
          const automobili = await getAutomobili();
          setRedovi(automobili);
        } catch (err) {
          console.log(err);
        } finally {
          console.log(false);
        }
      };
  
      fetchAutomobili();
    }, []);
    const Izmena = (automobil) => {
      navigate('/IzmeniAutomobil', { state: { auto: automobil } });
    };
    const Uzmi = async (id) => {
      let Automobil =await  UzmiAuto(id)
      setRedovi(Automobil)
    };
    const obrisi = async (id) => {
     let Automobili = await  izbaciAutomobil(id);
      setRedovi(Automobili);
      setSnackbarPoruka('Automobil sa id : '+id+' je obrisan');
      setSnackbarOtvoren(true);
    };

    const snackBarZatvori = () => {
      setSnackbarOtvoren(false);
    };

    const dodajPodatak = async (auto) => {
      console.log(auto)
      let Autmobili =await dodajAutomobil(auto)
      setRedovi(Autmobili);
      setSnackbarPoruka('Automobil je uspesno dodat');
      setSnackbarOtvoren(true);
    };
    const RedoviFja = (niz)=>
    {
     
      setRedovi([...niz]);

    }
    return (
      <div>
        <Dodavanje dodajPodatak={dodajPodatak} rows={rows} />
        <Sortiranje setNiz = {RedoviFja}/>
        <Tabela rows={rows} brisanje={obrisi} Izmena={Izmena} uzmi={Uzmi} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackBarOtovren}
          onClose={snackBarZatvori}
          message={snackbarPoruka}
          autoHideDuration={1200} 
        />
      </div>
    );
};

export default Vozila;
