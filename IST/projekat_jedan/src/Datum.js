const  napraviDatum = (date) => {
    const d = new Date(date);
    let mesec = `${d.getMonth() + 1}`;
    let dan = `${d.getDate()}`;
    const godina = d.getFullYear();
  
    if (mesec.length < 2) 
    mesec = '0' + mesec;
    if (dan.length < 2) 
    dan = '0' + dan;
  
    return [godina, mesec, dan].join('-');
  }
 export const Razlika = (datumOd,datumDo)=>{
    const date1 = new Date(datumOd);
    const date2 = new Date(datumDo);
    const razlikaUMilisekundama = date2 - date1;
    const razlikaUDanima = Math.round(razlikaUMilisekundama / (1000 * 60 * 60 * 24));
    console.log(datumDo +" "+ datumOd+"  "+ razlikaUDanima);
    return razlikaUDanima;
  }
  export default napraviDatum