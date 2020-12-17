import e, {Request, Response} from 'express';
import db from '../database';

const mongojs = require('mongojs');
/**
 * 
 */
class PondsController{

    /**
     * Procedure to get a list of all ponds within a farm object
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public list(req: Request, res: Response, next: any){
        //To list ponds we need to find the farm and get the ponds array of objects
        db.farms.findOne({_id:mongojs.ObjectId(req.params.farm_id)}, (err: any, farm: any) => {
            if (err) return next(err);
            if(farm.ponds)
                res.json(farm.ponds);
            else  res.json([]);
        });
    }

    public getOne(req: Request, res: Response, next: any) {
        //Similarly to get one pond, we need to get the farm and get the index to get the object at that position
        db.farms.findOne({_id:mongojs.ObjectId(req.params.farm_id)}, (err: any, farm: any) => {
            if (err) return next(err);
            if(farm.ponds)
                res.json(farm.ponds[req.params.pond_id]);
            else  res.json({});
        });
    }


    /**
     * Update an existing pond within a farm object
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    
    
    public update(req: Request, res: Response, next: any) {
        const farm_id = req.params.farm_id;
        const pond = req.body;

        var pond_id: number = +req.params.pond_id;
        /*
        First we need to make sure that we are not updating the name to something that is alredy in used
        For this we need to determine if there is a match and also get the index of the match because it
        could just be a normal update operation where the name will always match
        */
        db.farms.aggregate([{$match: {"_id":mongojs.ObjectId(farm_id)}},{$project:{"matchedIndex": {$indexOfArray: ["$ponds.name",pond.name]}}}], {}, (err: any, farm: any) => {
          
          //The aggregate will always return an object if it doesn't an error occurred
          if (err || !farm[0]) return next(err);

          //If there was no match the name was updated to something acceptable
          //OR we are dealing with the same pond object in which case the update can proceed
          if (farm[0].matchedIndex < 0 || farm[0].matchedIndex == pond_id) {
              //No to actually update a pond is a little tricky since there is no built-in way to update 
              //an element using the index.
              //One way to solve it is slicing the array to right before our desired element
              //essentially removing the desired object.
              db.farms.update({_id: mongojs.ObjectId(farm_id)}, [
                {$set: {ponds: {
                  $concatArrays: [ 
                    {$slice: ["$ponds", pond_id]}, 
                    {$slice: ["$ponds", {$add: [1, pond_id]}, {$size: "$ponds"}]}
                  ]
                }}}
              ]);//farms.update()

              //Then inserting te new one at that position which is something that is suported by MongoDB and MongoJS
              db.farms.updateOne({_id: mongojs.ObjectId(farm_id)}, { $push: { 'ponds': {$each: [pond] , $position: pond_id} } }, {}, (err: any, farm: any) => {
                if (err) return next(err);
                res.json({_id: farm_id, 'pond_id': pond_id, 'pond': pond});
              });
            } else {
              console.log(`Duplicate Index Key = The value ${pond.name} already exists`);
              res.status(400).json({'errCode':'11000', 'errorMsg': `The value ${pond.name} already exists`});
            }
        }); //farms.aggregate()
    } //update()


    /**
     * Funtcion to create a new pond within a farm object
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public create(req: Request, res: Response, next: any) {
        const pond = req.body;      
        const farm_id = req.params.farm_id;

        if(!farm_id) {
            res.status(400);
            res.json({'error': 'bad request'});
        } else {
            //Checking to see if pond name is already used for this farm
            db.farms.find({_id: mongojs.ObjectId(farm_id),"ponds.name": pond.name}, {}, (err: any, farm: any) => {
              
              if (err) return next(err);                          

              if (farm[0]) {
                console.log(`The value ${pond.name} already exists`);
                res.status(400).json({'errorMsg': `The value ${pond.name} already exists`});                    
              } else {

                    db.farms.updateOne({_id: mongojs.ObjectId(farm_id)}, { $push: { 'ponds': pond } }, {}, (err: any, farm: any) => {
                        if (err) return next(err);
                        res.json({_id: farm_id, 'new_pond': pond});
                    });
                }
            });            
        }
    }

    /**
     * Procedure to delete a pond from an existing fram
     * 
     * @param req 
     * @param res 
     */
    public delete(req: Request, res: Response) {

        const farm_id = req.params.farm_id;
        var pond_id: number = +req.params.pond_id;

        //Slicing the array essentially taking that desired object out
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
