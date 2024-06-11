
const { ObjectId } = require('mongodb');
const { Razlika, IzmedjuDvaDAtuma, DatumFiltriran, DatumFiltriranObrnuto } = require('./Utility');
const { dbName ,Konekcija} = require('../Baza')
const express = require('express');
const routerRezervacija = express.Router();

//Dodaje rezervaciju
routerRezervacija.post('/Rezervacije', async (req, res) => {
    let client;
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      console.log("############    "+req.body); 
      await db.collection('Rezervacije').insertOne(req.body); 
    /*  await db.collection('Automobil').updateOne(
        { _id: new ObjectId(req.body.AutoId) }
    );*/
      const dokumenti = await db.collection('Rezervacije').find({}).toArray();
      res.json(dokumenti);
    } catch (err) {
      console.error('Greska prilikom pronalazenje automobili', err);
      res.status(500).send('Greska prilikom pronalazenje automobili');
    } finally {
      if (client) {
        client.close();
      }
    }
  });
  routerRezervacija.get('/Rezervacije', async (req, res) => {
    let client;
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      const dokumenti = await db.collection('Rezervacije').find({}).toArray();
      res.json(dokumenti);
    } catch (err) {
      console.error('reska prilikom pronalazenje Rezervacije', err);
      res.status(500).send('reska prilikom pronalazenje Rezervacije');
    } finally {
      if (client) {
        client.close();
      }
    }
  });
  routerRezervacija.post('/RezervacijeUzmi', async (req, res) => {
    let client;
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      await db.collection('Automobil').updateOne(
        { _id: new ObjectId(req.body.AutoId) }, 
        { $set: { slobodan: false } }
    );
      const dokumenti = await db.collection('Automobil').find({}).toArray();
      res.json(dokumenti);
    } catch (err) {
      console.error('reska prilikom Uzimanja automobila', err);
      res.status(500).send('reska prilikom Uzimanja automobila');
    } finally {
      if (client) {
        client.close();
      }
    }
  });
  routerRezervacija.post('/RezervacijeVrati', async (req, res) => {
    let client;
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      await db.collection('Automobil').updateOne(
        { _id: new ObjectId(req.body.AutoId) }, 
        { $set: { slobodan: true } }
      
    );
    await db.collection('Rezervacije').updateOne(
      { _id: new ObjectId(req.body._id) }, 
      { $set: { ocena: req.body.ocena , cenaPoDanu : req.body.cenaPoDanu , ukupnaCena:Razlika(req.body.datumOd,Date.now())*req.body.cenaPoDanu,datumDo:Date.now} }
  );
      const dokumenti = await db.collection('Rezervacije').find({}).toArray();
      res.json(dokumenti);
    } catch (err) {
      console.error('GGGGGGGreska prilikom Uzimanja automobila', err);
      res.status(500).send('reska prilikom Uzimanja automobila');
    } finally {
      if (client) {
        client.close();
      }
    }
  });
  routerRezervacija.delete("/Rezervacije/:id", async (req, res) => {
    const id = req.params.id;
    let client;
    try {
        client = await Konekcija();
        const db = client.db(dbName); 
        console.log(id)
        let Rezervacija =await db.collection('Rezervacije').find({_id:new ObjectId(id)}).toArray()
        Rezervacija = Rezervacija[0]
        console.log("#####"+Rezervacija.ukupnaCena)
        await db.collection('Rezervacija_HIstory').insertOne({Rezervacija,datumBrisanja:new Date()})
          await db.collection('Rezervacije').deleteOne({ _id: new ObjectId(id) });
          const dokumenti = await db.collection('Rezervacije').find({}).toArray();
          res.json(dokumenti);
        
    } catch (error) {
        console.error('Greskae prilikom brisanja automobila.', error);
        res.status(500).send({ message: ' Greskae prilikom brisanja automobila.' });
    } finally {
        if (client) {
            await client.close();
        }
    }
  });
  routerRezervacija.get('/RezervacijeAutomobil', async (req, res) => {
    let client;
    const AutoId = req.query.AutoID;
    const datumOd = req.query.datumOd;
    const datumDo = req.query.datumDo;
    console.log("AUTOOOOOO je "+AutoId +"   OD "+datumOd + " datumDo" + datumDo)
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      let dokumenti = await db.collection('Rezervacije').find({
        AutoId:AutoId
      }).toArray();
  
  
      dokumenti = dokumenti.filter(el => {
        return IzmedjuDvaDAtuma(datumOd, datumDo, el.datumOd) && IzmedjuDvaDAtuma(datumOd, datumDo, el.datumDo);
      });
  
      res.json(dokumenti);
    } catch (err) {
      console.error('reska prilikom pronalazenje Rezervacije', err);
      res.status(500).send('reska prilikom pronalazenje Rezervacije');
    } finally {
      if (client) {
        client.close();
      }
    }
  });
  module.exports = routerRezervacija;