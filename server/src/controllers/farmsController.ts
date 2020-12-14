import {Request, Response} from 'express';
import db from '../database';

const mongojs = require('mongojs');

class FarmsController{

    public list(req: Request, res: Response, next: any){

        db.farms.find((err: any, farms: any) => {
            if (err) return next(err);
            console.log(farms);
            res.json(farms);
        });       
    }

    public getOne(req: Request, res: Response, next: any) {

        db.farms.findOne({_id:mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
            if (err) return next(err);
            res.json(farm);
        });
    }

    public getTotalSize(req: Request, res: Response, next: any) {

        var totalSize: number = 0;
        //This is a two step process where we get the document for the farm first
        //Then we iterate through each pond object in the ponds array
        db.farms.findOne({_id:mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
            if (err) return next(err);
            if (farm && farm.ponds){
                for (let pond of farm.ponds){
                    if (pond.size && pond.size + 0 == pond.size){
                        totalSize = totalSize + pond.size;
                    } 
                }
                res.json(totalSize)
            } else {
                res.json(0)
            }
        });
    }

    public create(req: Request, res: Response, next: any) {
        const farm = req.body;
        if (!farm.name) {
            res.status(400).json({'error': 'Bad Data'});
        } else {
            db.farms.save(farm,(err: any, farm: any) => {
                if (err) return next(err);
                res.json(farm);
            } );
        }
    }

    public update(req: Request, res: Response, next: any) {
        //TODO: Needs to make sure original farm exists to gracefully deal with it
        const farm = req.body;
        
        if(!farm.name) {        
            res.status(400);
            res.json({'error': 'bad request'});
        } else {            
            delete farm._id;
            //We quite lietrally replace the farm document that matches the Object ID
            db.farms.updateOne({_id: mongojs.ObjectId(req.params.id)}, { $set: farm }, {}, (err: any, farm: any) => {
                if (err) return next(err);
                res.json(farm);
            });
        }
    }

    public delete(req: Request, res: Response, next: any){
        db.farms.remove({_id: mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
        if(err){ res.send(err); }
        res.json(farm);
        });
    }
}

const farmsController = new FarmsController;
export default farmsController;
