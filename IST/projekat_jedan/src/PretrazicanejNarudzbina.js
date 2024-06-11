import * as React from 'react';
import { useEffect } from 'react';
import { getAutomobili } from './Automobili';
import { FormControl, Select, MenuItem, TextField, Box, Grid, Button } from '@mui/material';
import Tema from './Tema';
import napraviDatum from './Datum';
import { getUzimanjaAuto } from './Uzimanja';
export default function PretragaNarudzbina({PostaviRedove}) {
  const [id, setId] = React.useState('');
  const [automobili, setAutomobili] = React.useState([]);
  const [datumOd, setDatumOd] = React.useState(napraviDatum(new Date()));
    const [datumDo, setDatumDo] = React.useState(napraviDatum(new Date()));
    const PromeniDatumOd = (event) => {
      setDatumOd(event.target.value);
    };
    const PromeniDatumDo = (event) => {
      setDatumDo(event.target.value);
    };
    const UzimanjeAutomobilFja = async()=>{
     let UZimanaj = await getUzimanjaAuto(id,datumOd,datumDo);
     PostaviRedove(UZimanaj)
    }
  useEffect(() => {
    const fetchAutomobili = async () => {
      try {
        const automobili = await getAutomobili();
        setAutomobili(automobili);
      } catch (err) {
        console.log(err);
      } finally {
        console.log(false);
      }
    };

    fetchAutomobili();
  }, []);
  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              value={id}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ marginTop: 10 }}
            >
              <MenuItem value="">
                <em>Svi</em>
              </MenuItem>
              {automobili.map(auto => (
                <MenuItem key={auto._id} value={auto._id}>
                  {auto.model + " " + auto.godiste}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="datum-uzimanja"
              label="Unesite datum uzimanja"
              type="date"
              value={datumOd}
              onChange={PromeniDatumOd}
              InputLabelProps={{ shrink: true }}
              fullWidth
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="datum-vracanja"
              label="Unesite datum vracanja"
              type="date"
              value={datumDo}
              onChange={PromeniDatumDo}
              InputLabelProps={{ shrink: true }}
              fullWidth
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Button variant="outlined"  onClick={UzimanjeAutomobilFja}  style={{ backgroundColor: Tema.palette.common.black, color: Tema.palette.common.white, margin:10 }}>
                Pretrazi
        </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
}
