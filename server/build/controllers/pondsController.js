"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const mongojs = require('mongojs');
class PondsController {
    list(req, res, next) {
        database_1.default.farms.findOne({ _id: mongojs.ObjectId(req.params.farm_id) }, (err, farm) => {
            if (err)
                return next(err);
            if (farm.ponds)
                res.json(farm.ponds);
            else
                res.json([]);
        });
    }
    getOne(req, res, next) {
        database_1.default.farms.findOne({ _id: mongojs.ObjectId(req.params.farm_id) }, (err, farm) => {
            if (err)
                return next(err);
            if (farm.ponds)
                res.json(farm.ponds[req.params.pond_id]);
            else
                res.json({});
        });
    }
    update(req, res, next) {
        const farm_id = req.params.farm_id;
        const pond = req.body;
        var pond_id = +req.params.pond_id;
        database_1.default.farms.update({ _id: mongojs.ObjectId(farm_id) }, [
            { $set: { ponds: {
                        $concatArrays: [
                            { $slice: ["$ponds", pond_id] },
                            { $slice: ["$ponds", { $add: [1, pond_id] }, { $size: "$ponds" }] }
                        ]
                    } } }
        ]);
        database_1.default.farms.updateOne({ _id: mongojs.ObjectId(farm_id) }, { $push: { 'ponds': { $each: [pond], $position: pond_id } } }, {}, (err, farm) => {
            if (err)
                return next(err);
            res.json({ _id: farm_id, 'pond_id': pond_id, 'pond': pond });
        });
    }
    create(req, res, next) {
        //TODO: Needs to make sure original farm exists to gracefully deal with it
        const pond = req.body;
        const farm_id = req.params.farm_id;
        if (!farm_id) {
            res.status(400);
            res.json({ 'error': 'bad request' });
        }
        else {
            database_1.default.farms.updateOne({ _id: mongojs.ObjectId(farm_id) }, { $push: { 'ponds': pond } }, {}, (err, farm) => {
                if (err)
                    return next(err);
                res.json({ _id: farm_id, 'new_pond': pond });
            });
        }
    }
    delete(req, res) {
        const farm_id = req.params.farm_id;
        var pond_id = +req.params.pond_id;
        database_1.default.farms.update({ _id: mongojs.ObjectId(farm_id) }, [
            { $set: { ponds: {
                        $concatArrays: [
                            { $slice: ["$ponds", pond_id] },
                            { $slice: ["$ponds", { $add: [1, pond_id] }, { $size: "$ponds" }] }
                        ]
                    } } }
        ]);
        res.json({ message: `deleted ${pond_id} from farm(${farm_id})` });
    }
}
const pondsController = new PondsController;
exports.default = pondsController;
