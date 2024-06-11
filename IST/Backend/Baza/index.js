const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'RentACar';

const Konekcija = async () => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Povezan sa MongoDB');
        return client;
    } catch (err) {
        console.error('Greška prilikom povezivanja sa MongoDB:', err);
        throw err;
    }
};


module.exports = { Konekcija, dbName };
