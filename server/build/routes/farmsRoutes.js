"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const farmsController_1 = __importDefault(require("../controllers/farmsController"));
class FarmsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', farmsController_1.default.list);
        this.router.get('/:id', farmsController_1.default.getOne);
        this.router.get('/get-total-size/:id', farmsController_1.default.getTotalSize);
        this.router.post('/', farmsController_1.default.create);
        this.router.put('/:id', farmsController_1.default.update);
        this.router.delete('/:id', farmsController_1.default.delete);
    }
}
const farmsRoutes = new FarmsRoutes();
exports.default = farmsRoutes.router;
