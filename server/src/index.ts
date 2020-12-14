import express, {Application} from 'express';
//import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import farmsRoutes from './routes/farmsRoutes';
import pondsRoutes from './routes/pondsRoutes';

var morgan = require('morgan');

class Server{

    public app: Application; 

    constructor(){
        
        //This is the standard initialization calls for the entire server-side App
        //It uses Node Express as a web server
        this.app = express();   
        
        //Setting up a few server configuration settings 
        this.config();
        
        //Setting the routes to respond to
        //TODO: Need to configure outside route access
        this.routes();     

    }

    config(): void {
        //Setting up the port to be used.  Get it from the environment or use 3000 if undefined
        this.app.set('port', process.env.PORT || 3000);
        
        //Setting up a very usefull loggin utility specially for development
        this.app.use(morgan('dev'));
        //Setting up possible communications between modules
        this.app.use(cors());
        //Making sure hat the App is able to handle json format
        this.app.use(express.json());
        //Just in case data needs to be passed via url
        this.app.use(express.urlencoded({extended: false}));

        this.app.set('view engine', 'ejs');
        this.app.engine('html', require('ejs').renderFile);
    }

    routes(): void {
        //Main default route
        this.app.use('/', indexRoutes);
        //Each route will be handled by a single controller
        this.app.use('/api/farms', farmsRoutes);
        this.app.use('/api/ponds', pondsRoutes);
    }

    start(): void {
        //Setting up the port, If no address is given it will listen on all interfaces
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();
