//Thsi file contains the couple of settings for the project's Database

const mongojs = require('mongojs');
//Name of the Database: cargill   name of the collection: farms
const db = mongojs('cargill', ['farms']);

//Index to prevent duplicate farm names
db.farms.createIndex(
    {
        "name": 1
    },
    {
        unique: true
    },
    (err: any, farm: any) => {
        if (err) return console.log(err);
        console.log(farm);
    } );

export default db;

