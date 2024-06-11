const express = require('express');
const { ObjectId } = require('mongodb');
const { dbName ,Konekcija} = require('../Baza')
const routerAutmobil = require('./AutomoibliControler'); // Correct relative path
const routerRezervacija = require('./RezervacijeControler');
const routerKorisnik = require('./KorisnikControler');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use('/', routerAutmobil);
app.use('/', routerRezervacija);
app.use('/', routerKorisnik);
app.listen(port, () => {
  console.log(`Aplikacija sluša na http://localhost:${port}`);
});




