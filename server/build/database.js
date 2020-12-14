"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongojs = require('mongojs');
const db = mongojs('cargill', ['farms']);
exports.default = db;
