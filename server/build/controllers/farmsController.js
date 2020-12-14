"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const mongojs = require('mongojs');
class FarmsController {
    list(req, res, next) {
        database_1.default.farms.find((err, farms) => {
            if (err)
                return next(err);
            console.log(farms);
            res.json(farms);
        });
    }
    getOne(req, res, next) {
        database_1.default.farms.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, farm) => {
            if (err)
                return next(err);
            res.json(farm);
        });
    }
    getTotalSize(req, res, next) {
        var totalSize = 0;
        database_1.default.farms.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, farm) => {
            if (err)
                return next(err);
            if (farm && farm.ponds) {
                for (let pond of farm.ponds) {
                    if (pond.size && pond.size + 0 == pond.size) {
                        totalSize = totalSize + pond.size;
                    }
                }
                res.json(totalSize);
            }
            else {
                res.json(0);
            }
        });
    }
    create(req, res, next) {
        const farm = req.body;
        if (!farm.name) {
            res.status(400).json({ 'error': 'Bad Data' });
        }
        else {
            database_1.default.farms.save(farm, (err, farm) => {
                if (err)
                    return next(err);
                res.json(farm);
            });
        }
    }
    update(req, res, next) {
        //TODO: Needs to make sure original farm exists to gracefully deal with it
        const farm = req.body;
        if (!farm.name) {
            res.status(400);
            res.json({ 'error': 'bad request' });
        }
        else {
            delete farm._id;
            database_1.default.farms.updateOne({ _id: mongojs.ObjectId(req.params.id) }, { $set: farm }, {}, (err, farm) => {
                if (err)
                    return next(err);
                res.json(farm);
            });
        }
    }
    delete(req, res, next) {
        database_1.default.farms.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, farm) => {
            if (err) {
                res.send(err);
            }
            res.json(farm);
        });
    }
}
const farmsController = new FarmsController;
exports.default = farmsController;
