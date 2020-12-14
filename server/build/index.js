"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import morgan from 'morgan';
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const farmsRoutes_1 = __importDefault(require("./routes/farmsRoutes"));
const pondsRoutes_1 = __importDefault(require("./routes/pondsRoutes"));
var morgan = require('morgan');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.set('view engine', 'ejs');
        this.app.engine('html', require('ejs').renderFile);
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/farms', farmsRoutes_1.default);
        this.app.use('/api/ponds', pondsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
