"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pondsController_1 = __importDefault(require("../controllers/pondsController"));
class PondsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:farm_id', pondsController_1.default.list);
        this.router.get('/:farm_id/:pond_id', pondsController_1.default.getOne);
        this.router.post('/:farm_id', pondsController_1.default.create);
        this.router.put('/:farm_id/:pond_id', pondsController_1.default.update);
        this.router.delete('/:farm_id/:pond_id', pondsController_1.default.delete);
    }
}
const pondsRoutes = new PondsRoutes();
exports.default = pondsRoutes.router;
