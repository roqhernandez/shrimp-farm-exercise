import e, {Request, Response} from 'express';
import db from '../database';

const mongojs = require('mongojs');

class PondsController{

    public list(req: Request, res: Response, next: any){
        db.farms.findOne({_id:mongojs.ObjectId(req.params.farm_id)}, (err: any, farm: any) => {
            if (err) return next(err);
            if(farm.ponds)
                res.json(farm.ponds);
            else  res.json([]);
        });
    }

    public getOne(req: Request, res: Response, next: any) {
        db.farms.findOne({_id:mongojs.ObjectId(req.params.farm_id)}, (err: any, farm: any) => {
            if (err) return next(err);
            if(farm.ponds)
                res.json(farm.ponds[req.params.pond_id]);
            else  res.json({});
        });
    }

    public update(req: Request, res: Response, next: any) {
        const farm_id = req.params.farm_id;
        const pond = req.body;

        var pond_id: number = +req.params.pond_id;

        db.farms.update({_id: mongojs.ObjectId(farm_id)}, [
            {$set: {ponds: {
                  $concatArrays: [ 
                         {$slice: ["$ponds", pond_id]}, 
                         {$slice: ["$ponds", {$add: [1, pond_id]}, {$size: "$ponds"}]}
                  ]
            }}}
       ]);

       db.farms.updateOne({_id: mongojs.ObjectId(farm_id)}, { $push: { 'ponds': {$each: [pond] , $position: pond_id} } }, {}, (err: any, farm: any) => {
            if (err) return next(err);
            res.json({_id: farm_id, 'pond_id': pond_id, 'pond': pond});
        });
    }

    public create(req: Request, res: Response, next: any) {
        //TODO: Needs to make sure original farm exists to gracefully deal with it
        const pond = req.body;      
        const farm_id = req.params.farm_id;

        if(!farm_id) {
            res.status(400);
            res.json({'error': 'bad request'});
        } else {
            db.farms.updateOne({_id: mongojs.ObjectId(farm_id)}, { $push: { 'ponds': pond } }, {}, (err: any, farm: any) => {
                if (err) return next(err);
                res.json({_id: farm_id, 'new_pond': pond});
            });
        }
    }

    public delete(req: Request, res: Response) {

        const farm_id = req.params.farm_id;
        var pond_id: number = +req.params.pond_id;

        db.farms.update({_id: mongojs.ObjectId(farm_id)}, [
            {$set: {ponds: {
                  $concatArrays: [ 
                         {$slice: ["$ponds", pond_id]}, 
                         {$slice: ["$ponds", {$add: [1, pond_id]}, {$size: "$ponds"}]}
                  ]
            }}}
       ]);

        res.json({ message: `deleted ${pond_id} from farm(${farm_id})` });

    }
}

const pondsController = new PondsController;
export default pondsController;