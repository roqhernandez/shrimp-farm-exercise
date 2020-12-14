import { Router } from 'express';
import farmsController from '../controllers/farmsController';

class FarmsRoutes{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //Very straight forward of handling all meaningful requests
        this.router.get('/', farmsController.list);
        this.router.get('/:id', farmsController.getOne);
        this.router.get('/get-total-size/:id', farmsController.getTotalSize);
        this.router.post('/', farmsController.create);
        this.router.put('/:id', farmsController.update);
        this.router.delete('/:id', farmsController.delete);
    }
}

const farmsRoutes = new FarmsRoutes();

export default farmsRoutes.router;
