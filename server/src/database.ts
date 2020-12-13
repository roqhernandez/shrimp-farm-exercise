const mongojs = require('mongojs');
const db = mongojs('cargill', ['farms']);

export default db;