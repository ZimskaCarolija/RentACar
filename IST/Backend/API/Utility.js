exports.IzmedjuDvaDAtuma = (datumOd, datumDo, datum) => {
    let datummOd_P = new Date(datumOd); 
    let datummDo_P = new Date(datumDo); 
    let datum_P = new Date(datum)
    if (datum_P >= datummOd_P && datum_P <= datummDo_P) {
      return true;
    } else {
      return false;
    }
  };
  exports.DatumFiltriran = (Od, Do, nizAuto, nizPOrudz) => {
  
    if (!Od || !Do) {
        console.error('Datumi nisu dobro prosledeni');
        return [];
    }
    
    let DatumOd = new Date(Od);
    let DatumDo = new Date(Do);
    
    let uzimanja2 = nizPOrudz.filter(el => {
      const datumPocetak = new Date(el.datumOd);
      const datumKraj = new Date(el.datumDo);
      return (datumPocetak <= DatumDo && datumKraj >= DatumOd);
  });
  
    const zauzetiAutomobiliId = uzimanja2.map(el => el.AutoId.toString());
    const dostupniAutomobili = nizAuto.filter(automobil => !zauzetiAutomobiliId.includes(automobil._id.toString()));
    
    return dostupniAutomobili;
  };
  exports.DatumFiltriranObrnuto = (Od, Do, nizAuto, nizPOrudz) => {
  
    if (!Od || !Do) {
        console.error('Datumi nisu dobro prosledeni');
        return [];
    }
    
    let DatumOd = new Date(Od);
    let DatumDo = new Date(Do);
    
    let uzimanja2 = nizPOrudz.filter(el => {
      const datumPocetak = new Date(el.datumOd);
      const datumKraj = new Date(el.datumDo);
      return (datumPocetak <= DatumDo && datumKraj >= DatumOd);
  });
  
    const zauzetiAutomobiliId = uzimanja2.map(el => el.AutoId.toString());
    const dostupniAutomobili = nizAuto.filter(automobil => zauzetiAutomobiliId.includes(automobil._id.toString()));
    
    return dostupniAutomobili;
  };
  exports.Razlika = (datumOd,datumDo)=>{
    const date1 = new Date(datumOd);
    const date2 = new Date(datumDo);
    const razlikaUMilisekundama = date2 - date1;
    const razlikaUDanima = Math.round(razlikaUMilisekundama / (1000 * 60 * 60 * 24));
    console.log(datumDo +" "+ datumOd+"  "+ razlikaUDanima);
    if(razlikaUDanima <0)
      return 0;
    return razlikaUDanima;
  }