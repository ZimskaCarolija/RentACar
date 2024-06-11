import Box from '@mui/material/Box';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper } from '@mui/material';
import { getAutomobili } from '../Automobili';
import { Sortiraj } from '../Automobili';
const Sortiranje = ({setNiz})=>
{
    const [odabir,setOdabir] = React.useState("");
    const OdaberiFja = async(event) => {
        const noviOdabir = event.target.value;
        setOdabir(noviOdabir);
        const nizPOm = await Sortiraj(noviOdabir);
        setNiz(nizPOm);
      };
        return(<Box component="section" sx={{ p: 2}}>
                <Paper elevation={5} style={{padding:20}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sortiraj</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={odabir}
                    label="Sortiraj"
                    onChange={OdaberiFja}
                >
                    <MenuItem value={""}>Od Sortiraj</MenuItem>
                    <MenuItem value={"modelOpadajuce"}>Model Opadajuce</MenuItem>
                    <MenuItem value={"modelRastuce"}>Model Rastuce</MenuItem>
                    <MenuItem value={"cenaRastuce"}>Cena Rastuce</MenuItem>
                    <MenuItem value={"cenaOpadajuce"}>Cena Opadajuce</MenuItem>
                </Select>
                </FormControl>
                </Paper>
        </Box>)
}
export default Sortiranje