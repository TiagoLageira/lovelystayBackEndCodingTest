"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = void 0;
const database_1 = __importDefault(require("../migrations/database"));
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.none(`
 CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(255),
  email VARCHAR(255),
  languages JSONB
 );
 `);
            console.log("Table ready");
        }
        catch (error) {
            console.error("Table not ready", error);
        }
    });
}
exports.createTable = createTable;
