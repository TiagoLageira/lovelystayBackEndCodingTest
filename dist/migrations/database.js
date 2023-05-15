"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pgp = (0, pg_promise_1.default)();
const db = pgp({
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});
exports.default = db;
