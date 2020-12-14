import { Router } from 'express';

class IndexRoutes{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //Default request handling
        //TODO sned a more meaningfull message
        this.router.get('/', (req,res) => res.send('DEFAULT'));
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;
