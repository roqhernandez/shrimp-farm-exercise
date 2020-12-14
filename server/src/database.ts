//Thsi file contains the couple of settings for the project's Database

const mongojs = require('mongojs');
//Name of the Database: cargill   name of the collection: farms
const db = mongojs('cargill', ['farms']);

export default db;
