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
exports.displayUsersByProgLang = exports.displayUsersByLocation = exports.displayAllUsersInDb = exports.addUser = void 0;
const database_1 = __importDefault(require("../migrations/database"));
// Create user data in db
function addUser(userData, languagesData, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use a prepared statement to prevent SQL injection attacks
        const query = {
            text: 'INSERT INTO users (name, company, location, email, languages)' +
                'VALUES ($1, $2, $3, $4, $5)',
            values: [userData.name,
                userData.company,
                userData.location,
                userData.email,
                languagesData]
        };
        yield database_1.default.none(query);
        console.log(`User ${userName} added to db.`);
    });
}
exports.addUser = addUser;
// Fetch all user data from db
function displayAllUsersInDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // fetch all the users in DB
            const data = yield database_1.default.any(`SELECT * FROM users`);
            // show the data in the command line
            console.log(`All users in DB:`);
            data.forEach((row) => {
                console.log(row);
            });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
exports.displayAllUsersInDb = displayAllUsersInDb;
// Fetch users by location from db
function displayUsersByLocation(columnName, columnValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Use a prepared statement to prevent SQL injection attacks
            const query = {
                text: `SELECT * FROM users WHERE ${columnName} = $1`,
                values: [columnValue]
            };
            const data = yield database_1.default.any(query);
            if (data.length == 0) {
                console.log(`No users in ${columnValue} found in bd.`);
            }
            else {
                // show the data in the command line
                console.log(`All users who are in ${columnValue}:`);
                data.forEach((row) => {
                    console.log(row);
                });
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
exports.displayUsersByLocation = displayUsersByLocation;
// Fetch users by programming language from db
function displayUsersByProgLang(language) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the data from the column
            const data = yield database_1.default.any(`SELECT * FROM users WHERE languages @> '${language}'`);
            if (data.length == 0) {
                console.log(`No users know ${language} found in bd.`);
            }
            else {
                // Show the data in the command line
                console.log(`Users who know ${language}:`);
                data.forEach((row) => {
                    console.log(row);
                });
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
exports.displayUsersByProgLang = displayUsersByProgLang;
