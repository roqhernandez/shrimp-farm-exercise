import {Request, Response} from 'express';
import db from '../database';

const mongojs = require('mongojs');

/**
 * 
 */
class FarmsController{


    /**
     * Procedure to get a list of all Farm objects
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public list(req: Request, res: Response, next: any){

        db.farms.find((err: any, farms: any) => {
            if (err) return next(err);
            console.log(farms);
            res.json(farms);
        });       
    }

    /**
     * Procedure to get the details of a single Farm object using the _id
     * @param req 
     * @param res 
     * @param next 
     */
    public getOne(req: Request, res: Response, next: any) {

        db.farms.findOne({_id:mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
            if (err) return next(err);
            res.json(farm);
        });
    }

    /**
     * As specified in the requirements, to get the total size of a farm based on its collection
     * of ponds, it needed to be implemented as an API call.
     * @param req 
     * @param res 
     * @param next 
     */
    public getTotalSize(req: Request, res: Response, next: any) {

        var totalSize: number = 0;
        //This is a two step process where we get the document for the farm first
        //Then we iterate through each pond object in the ponds array
        db.farms.findOne({_id:mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
            if (err) return next(err);
            //If there is a farm object and a ponds array
            if (farm && farm.ponds){
                //Iterate through every pond adding the size of every pond
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

    /**
     * Procedure to create a farm.
     * @param req 
     * @param res 
     * @param next 
     */
    public create(req: Request, res: Response, next: any) {
        const farm = req.body;
        //Simple check of the required farm.name.  Place for more in-depth validation
        if (!farm.name) {
            res.status(400).json({'error': 'Bad Data'});
        } else {
            db.farms.save(farm,(err: any, farm: any) => {
                
                if (err) {
                    //An index on the DB is created in the database.ts file and it's logic is used to prevent
                    //multiple farms with the same name
                    if (err.code == 11000) {
                        console.log(`Duplicate Index Key = The value ${err.keyValue.name} already exists`);
                        res.status(400).json({'errCode':'11000', 'errorMsg': `The value ${err.keyValue.name} already exists`});
                    } else {  //More exhaustive error-handling would go here
                        return next(err);
                    }
                } else 
                res.json(farm);
            } );
        }
    }


    /**
     * Procedure to update an existing farm object
     * @param req 
     * @param res 
     * @param next 
     */
    public update(req: Request, res: Response, next: any) {
        const farm = req.body;
        
        if(!farm.name) {        
            res.status(400);
            res.json({'error': 'bad request'});
        } else {            
            delete farm._id;
            //We quite lietrally replace the farm document that matches the Object ID
            db.farms.updateOne({_id: mongojs.ObjectId(req.params.id)}, { $set: farm }, {}, (err: any, farm: any) => {
                if (err) {
                    //Dealing with duplicate name
                    if (err.code == 11000) {
                        console.log(`Duplicate Index Key = The value ${err.keyValue.name} already exists`);
                        res.status(400).json({'errCode':'11000', 'errorMsg': `The value ${err.keyValue.name} already exists`});
                    } else {
                        return next(err);
                    }
                } else 
                res.json(farm);
            });
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public delete(req: Request, res: Response, next: any){
        db.farms.remove({_id: mongojs.ObjectId(req.params.id)}, (err: any, farm: any) => {
            
            if(err) res.send(err); 
            
            res.json(farm);
        });
    }
}

const farmsController = new FarmsController;
export default farmsController;
