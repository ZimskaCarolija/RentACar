import Uzimanja, { IzbrisiPOAutoId, getUzimanja} from './Uzimanja';
import axios from 'axios';

let Automobili = [
{
    id:1,
    model:'Mercedes-Benz AMG GLE 53',
    cena:'140',
    godiste:2022,
    klima:true
},
{
    id:2,
    model:'Mercedes-Benz AMG E 53',
    cena:'80',
    godiste:2019,
    klima:true
},
{
    id:3,
    model:'Mercedes-Benz AMG G 63',
    cena:'230',
    godiste:2023,
    klima:true
},
{
    id:4,
    model:'Nissan 240SX',
    cena:'20',
    godiste:1996,
    klima:false
}
,
{
    id:5,
    model:'Nissan ARIYA VENTURE',
    cena:'45',
    godiste:2024,
    klima:true
}
,
{
    id:6,
    model:'Kia Sportage',
    cena:'38',
    godiste:2024,
    klima:true
}
];
export const izbaciAutomobil = async (id) => {

  try {
    const response = await axios.delete(`http://localhost:3000/Automobil/${id}`);
    console.log("POdatci su " + response.data)
    return response.data;
    
  } catch (error) {
    console.error('Greska PRILIKOM BRISANJA', error);
    
  }
  };
  export const getAutomobili = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      console.log(response.data)
      debugger
      return response.data;
    } catch (error) {
      console.error('reska prilikom pronalazenje automobil:', error);
      throw error;
    }
  };
  export const dodajAutomobil = async (auto) => {

    console.log(auto)
    try {
      const response = await axios.post('http://localhost:3000/Automobil', {model:auto.model, cena: auto.cena, godiste: auto.godiste, klima: auto.klima,slobodan:true});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom dodadavnja', error);
      
    }
  };
  export const IzmeniAutomobilF = async (id,auto)=>{
    console.log(id + "   " + auto)
    try {
      const response = await axios.put(`http://localhost:3000/AutomobilIzmena/${id}`, {model:auto.model, cena: auto.cena, godiste: auto.godiste, klima: auto.klima});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom izmene', error);
      
    }
  }
  export const UzmiAuto = async (id)=>{
 console.log("id je :" + id)
    try {
      const response = await axios.post(`http://localhost:3000/RezervacijeUzmi`, {AutoId:id});
      console.log("Vraceno je "+response.data)
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom Uzimanja', error);
      
    }
  }



  export const FIltirajDatum = async (Od, Do) => {
    console.log("AAAAAAa " + Od + " : " + Do);
    try {
        let response = await axios.get(`http://localhost:3000/AutomobilDatum`, {
            params: {
                Od: Od,
                Do: Do
            }
        });
        console.log("DATUM OCENA" + response.data)
        return response.data;
    } catch (error) {
        console.error('Greška prilikom filtriranja datuma', error);
        return [];
    }
};
export const FIltirajDatumObrnuto = async (Od, Do) => {
  console.log("AAAAAAa " + Od + " : " + Do);
  try {
      let response = await axios.get(`http://localhost:3000/AutomobilDatumObrnuto`, {
          params: {
              Od: Od,
              Do: Do
          }
      });
      console.log("DATUM OCENA" + response.data)
      return response.data;
  } catch (error) {
      console.error('Greška prilikom filtriranja datuma obrnuto', error);
      return [];
  }
};
  export const Pretraga= async (stringPretrage,Od,Do)=> {
    console.log("Niz u automobili ");
    try {
      let response = await axios.get(`http://localhost:3000/AutomobilDatumPretraga`, {
          params: {
              Od: Od,
              Do: Do,
              strPretrage:stringPretrage
          }
      });
      console.log(response.data)
      debugger
      return response.data;
  } catch (error) {
      console.error('Greška prilikom Pretrage datuma', error);
      return [];
  }
}


  export const Sortiraj = async (tip) => {

    console.log("TIP JE "+tip)
    try {
      let response = await axios.get(`http://localhost:3000/AutomobilSortiraj/${tip}`);
      console.log("Reziltat sortiranja je")
      console.log(response.data)
      
      return response.data;
  } catch (error) {
      console.error('Greška prilikom Sortiranja ', error);
      return [];
  }
  };
 export const najpopularnijiFja = async() => {
  try {
    let response = await axios.get(`http://localhost:3000/AutomobilNajpopularnije`);
    console.log("Reziltat Najpopularnijeg je")
    console.log(response.data)
    return response.data;
} catch (error) {
    console.error('Greška prilikom Najpopularnijeg ', error);
    return [];
}
};
export default Automobili