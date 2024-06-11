
const { Razlika, IzmedjuDvaDAtuma, DatumFiltriran, DatumFiltriranObrnuto } = require('./Utility');
const { ObjectId } = require('mongodb');
const { dbName ,Konekcija} = require('../Baza')
const express = require('express');
const routerAutmobil = express.Router();
const VratiSveAutomobile = async()=>{
    let client;
    try {
      client = await Konekcija();
      const db = client.db(dbName); 
      const dokumenti = await db.collection('Automobil').aggregate([
        {
            $lookup: {
                from: "Rezervacije",
                localField: "model",
                foreignField: "model",
                as: "Rezervacije"
            }
        },
        {
            $unwind: {
                path: "$Rezervacije",
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $group: {
                _id: "$_id",
                cena: { $first: "$cena" },
                model: { $first: "$model" },
                godiste: { $first: "$godiste" },
                klima: { $first: "$klima" },
                slobodan: { $first: "$slobodan" },
                ocene: { $push: "$Rezervacije.ocena" },
                datumDo: { $push: "$Rezervacije.datumDo" },
                ProsecnaOcena: { $avg: "$Rezervacije.ocena" } // Calculate average rating
            }
        },
        {
            $project: {
                _id: 1,
                cena: 1,
                model: 1,
                godiste: 1,
                klima: 1,
                slobodan: 1,
                ocene: {
                    $filter: {
                        input: "$ocene",
                        as: "ocena",
                        cond: { $ne: ["$$ocena", null] }
                    }
                },
                datumDo: 1,
                ProsecnaOcena: 1 // Include average rating in the output
            }
        },
    ]).toArray();
      return dokumenti
    } catch (err) {
      console.error('reska prilikom pronalazenje automobil', err);
      return [];
    } finally {
      if (client) {
        client.close();
      }
    }
  }
  
routerAutmobil.put("/AutomobilIzmena/:id", async (req, res) => {
    const id = req.params.id;
    let client;
    try {
        client = await Konekcija();
        const db = client.db(dbName); 
        console.log(id)
              await db.collection('Automobil').updateOne(
              { _id: new ObjectId(id) }, 
              { $set: req.body } 
          );
          const dokumenti = await db.collection('Automobil').find({}).toArray();
          res.json(dokumenti);
        
    } catch (error) {
        console.error('Greska prilikom updejtivanja automobili:', error);
        res.status(500).send({ message: 'Greska prilikom updejtivanja automobili:' });
    } finally {
        if (client) {
            await client.close();
        }
    }
  });
  routerAutmobil.get('/', async (req, res) => {
    const dokumenti =  await VratiSveAutomobile()
    res.json(dokumenti)
  });
  routerAutmobil.post('/Automobil', async (req, res) => {
      let client;
      try {
        client = await Konekcija();
        const db = client.db(dbName); 
        console.log("############    "+req.body); 
        await db.collection('Automobil').insertOne(req.body); 
        const dokumenti =  await VratiSveAutomobile()
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
    routerAutmobil.get('/AutomobilDatum', async (req, res) => {
      let client;
      let { Od, Do } = req.query;
      console.error("Od "+Od)
      const automobili =  await VratiSveAutomobile()
      try {
        client = await Konekcija();
        const db = client.db(dbName); 
        const rezervacije = await db.collection('Rezervacije').find({}).toArray();
        let dokumenti = DatumFiltriran(Od,Do,automobili,rezervacije)
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom filtriranja automobil', err);
        res.status(500).send('reska prilikom filtriranja automobilta');
      } finally {
        if (client) {
          client.close();
        }
      }
    });
    routerAutmobil.get('/AutomobilDatumPretraga', async (req, res) => {
      let client;
      let { Od, Do,strPretrage } = req.query;
      console.error("########## Od "+Od + "   DO"+Do + " Pretraga " + strPretrage)
      try {
        client = await Konekcija();
        const db = client.db(dbName); 
        
        const automobili =  await VratiSveAutomobile()
        const rezervacije = await db.collection('Rezervacije').find({}).toArray();
        let dokumenti = DatumFiltriran(Od,Do,automobili,rezervacije)
        dokumenti = dokumenti.filter(el=> el.model.toUpperCase().includes(strPretrage.toUpperCase()))
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom Pretrage automobil', err);
        res.status(500).send('reska prilikom Pretrage automobilta');
      } finally {
        if (client) {
          client.close();
        }
      }
    });
  routerAutmobil.delete("/Automobil/:id", async (req, res) => {
      const id = req.params.id;
      let client;
      try {
          client = await Konekcija();
          const db = client.db(dbName); 
          console.log(id)
          let Auto =await db.collection('Automobil').find({_id:new ObjectId(id)}).toArray()
          Auto = Auto[0]
          console.log("#####"+Auto.model)
          await db.collection('Automobili_HIstory').insertOne({Auto,datumBrisanja:new Date()})
            await db.collection('Automobil').deleteOne({ _id: new ObjectId(id) });
            const dokumenti = await VratiSveAutomobile();
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
  routerAutmobil.get('/', async (req, res) => {
      const dokumenti = await VratiSveAutomobile()
      try {
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom pronalazenje automobil', err);
        res.status(500).send('reska prilikom pronalazenje automobilta');
      } finally {
       
      }
    });
  routerAutmobil.get('/AutomobilSortiraj/:tip', async (req, res) => {
      let tip = req.params.tip;
      const dokumenti =  await VratiSveAutomobile()
      console.log("TIP Sortiranje je #"+tip+"#")
      try { 
        switch (tip) {
          case "modelOpadajuce":
             dokumenti.sort((a, b) => b.model.localeCompare(a.model));break;
          case "modelRastuce":
            dokumenti.sort((a, b) => a.model.localeCompare(b.model));break;
          case "cenaRastuce":
             dokumenti.sort((a, b) => a.cena - b.cena);break;
          case "cenaOpadajuce":
             dokumenti.sort((a, b) => b.cena - a.cena);break;
          default:
            console.log("NI opcemu s ene sortira");
        }
  
  
  
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom Sortiranja automobil', err);
        res.status(500).send('reska prilikom Sortiranja automobilta');
      } finally {
         {
          
        }
      }
    });
    routerAutmobil.get('/AutomobilNajpopularnije', async (req, res) => {
        let client
      try { 
        client = await Konekcija();
        const db = client.db(dbName); 
        const dokumenti = await db.collection('Automobil').aggregate([
          {
            $lookup: {
              from: "Rezervacije",
              localField: "model",
              foreignField: "model",
              as: "Rezervacije"
            }
          },
          {
            $unwind: "$Rezervacije" 
          },
          {
            $group: {
              _id: "$model", 
              cena: { $first: "$cena" },
              model: { $first: "$model" }, 
              brojRezervacija: { $sum: 1 } 
            }
          },
          {
            $project: {
              _id: "$_id",
              cena: "$cena",
              model: "$model",
              brojRezervacija: "$brojRezervacija"
            }
          }
        ]).toArray();
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom Najpopularnijeg automobil', err);
        res.status(500).send('reska prilikom najpopularnijeg automobilta');
      } finally {
        if(client)
          {
            client.close()
          }
      }
    });
    routerAutmobil.get('/AutomobilDatumObrnuto', async (req, res) => {
      let client;
      let { Od, Do } = req.query;
      console.error("Od "+Od)
      const automobili =  await VratiSveAutomobile()
      try {
        client = await Konekcija();
        const db = client.db(dbName); 
        const rezervacije = await db.collection('Rezervacije').find({}).toArray();
        let dokumenti = DatumFiltriranObrnuto(Od,Do,automobili,rezervacije)
        res.json(dokumenti);
      } catch (err) {
        console.error('reska prilikom filtriranja automobil', err);
        res.status(500).send('reska prilikom filtriranja automobilta');
      } finally {
        if (client) {
          client.close();
        }
      }
    });
module.exports = routerAutmobil