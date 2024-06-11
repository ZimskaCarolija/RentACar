import Narucivanje from "./Narucivanje";
import axios from "axios";
let Uzimanja = [
];
export const izbaciUzimanja = async(id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Rezervacije/${id}`);
    console.log("POdatci su " + response.data)
    return response.data;
    
  } catch (error) {
    console.error('Greska PRILIKOM BRISANJA', error);
    
  }
  };
  export const getUzimanja  = async() => {
    try {
      const response = await axios.get('http://localhost:3000/Rezervacije');
    
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom ucitavanja Rezervacije', error);
      
    }
  };
  export const getUzimanjaAuto  = async(AutoID,datumOd,datumDo) => {
    try {
      const response = await axios.get('http://localhost:3000/RezervacijeAutomobil',{params:{AutoID:AutoID,datumOd:datumOd,datumDo:datumDo}});
      console.log("Uzetoo   auto"+response.data)
      debugger
      return response.data;
      
    } catch (error) {
      console.error('gRESKA PRILIkom ucitavanja Rezervacije', error);
      
    }
  };
  export const dodajUzimanja  =async  (naruci) => {
    console.log("Naruci ::   "+naruci)
    debugger
    try {
      const response = await axios.post('http://localhost:3000/Rezervacije', {AutoId:naruci.id,model:naruci.model,datumOd:naruci.datumOd,datumDo:naruci.datumDo,telefon:naruci.telefon,ukupnaCena:naruci.ukupnaCena,cenaPoDanu:naruci.cenaPoDanu});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom dodadavnja', error);
      
    }
  };
  export const VratiAuto = async (porudzbina,value)=>{
    try {
      const response = await axios.post(`http://localhost:3000/RezervacijeVrati`, {AutoId:porudzbina.AutoId,_id:porudzbina._id,ocena:value,cenaPoDanu:porudzbina.cenaPoDanu,datumOd:porudzbina.datumOd});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('gRESKA PRILIkom Vracanja', error);
      
    }
  }
  export const IzmeniUzimanjaF = (id,naruci)=>{
    Uzimanja.forEach((a,index)=>{
        if(a.id == id)
        Uzimanja[index] = naruci;
    })
  }
  export const UzmiProsecnuOcenu=(idA)=> {
    let prosek = 0;
    let suma = 0;
    let broj = 0;
    Uzimanja.forEach(el=>{
      if(el.AutomobilId == idA)
      {
        suma+=parseInt(el.ocena)
        broj+=1;
      }
    });
    if(broj!=0)
    prosek = suma/broj;

    return prosek;

  }
 export  const IzbrisiPOAutoId=(idA)=>
  {
    Uzimanja = Uzimanja.filter(el=>el.AutomobilId!=idA);
  }
  
export default Uzimanja