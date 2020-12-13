import { Router } from 'express';
import pondsController from '../controllers/pondsController';

class PondsRoutes{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:farm_id', pondsController.list);
        this.router.get('/:farm_id/:pond_id', pondsController.getOne);
        this.router.post('/:farm_id', pondsController.create);
        this.router.put('/:farm_id/:pond_id', pondsController.update);
        this.router.delete('/:farm_id/:pond_id', pondsController.delete);
    }
}

const pondsRoutes = new PondsRoutes();

export default pondsRoutes.router;