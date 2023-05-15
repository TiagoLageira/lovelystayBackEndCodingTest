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
const axios_1 = __importDefault(require("axios"));
const readline_1 = __importDefault(require("readline"));
const _001_create_users_table_1 = require("../migrations/001-create-users-table");
const db_1 = require("./db");
const db_2 = require("./db");
const db_3 = require("./db");
const db_4 = require("./db");
// Create readline Interface
const RL = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Run menu
function optionsMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const USERINPUT = yield getUserInput("\nEnter the number corresponding a function and press \"Enter\"\n" +
            "1. Store information about a GitHub user on a database;\n" +
            "2. Display all users on the database;\n" +
            "3. Display all users by location;\n" +
            "4. Display all users by programming language;\n" +
            "0. Exit.\n");
        return USERINPUT;
    });
}
// Resolve user input
function getUserInput(question) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            RL.question(question, (answer) => {
                resolve(answer);
            });
        });
    });
}
// Fetch user data from github
function getUserData(userName, ACCESS_TOKEN) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the API endpoint URL
        const URL = `https://api.github.com/users/${userName}`;
        return axios_1.default.get(URL, {
            headers: { Authorization: `token ${ACCESS_TOKEN}` },
        })
            .then(response => {
            // Return the user data
            return response.data;
        })
            .catch(error => {
            console.log(`Request failed with error: ${error.message}`);
        });
    });
}
// Fetch programming languages from github repositories
function getProgLanguagesData(userName, ACCESS_TOKEN) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the API endpoint URL
        const URL = `https://api.github.com/users/${userName}/repos`;
        return axios_1.default.get(URL, {
            headers: { Authorization: `token ${ACCESS_TOKEN}` },
        })
            .then(response => {
            //Map languages from repos
            const LANGUAGEDATA = Array.from(new Set(response.data.map((repo) => repo.language).filter(Boolean)));
            //Convert mapped data to "JSONB"
            const languagesDataJsonb = JSON.stringify(LANGUAGEDATA);
            // Return the languages data
            return languagesDataJsonb;
        })
            .catch(error => {
            console.log(`Request failed with error: ${error.message}`);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create Variables
        let userInput;
        let userName;
        let userData;
        let languagesData;
        let userLocation;
        let userLanguage;
        let jsonString;
        // Create Table
        yield (0, _001_create_users_table_1.createTable)();
        // Receive github access_token from user
        const ACCESS_TOKEN = yield getUserInput("\nEnter your GitHub API Access token:\n");
        // Create Menu cicle
        let isDone = false;
        while (!isDone) {
            // Call menu function
            userInput = yield optionsMenu();
            switch (userInput) {
                case "0":
                    isDone = true;
                    break;
                case "1":
                    userName = yield getUserInput("\nEnter name of the GitHub to add to the database:\n");
                    userData = yield getUserData(userName, ACCESS_TOKEN);
                    languagesData = yield getProgLanguagesData(userName, ACCESS_TOKEN);
                    // Check if userData and languagesData is defined
                    if (userData && languagesData) {
                        // console.log(userData)
                        yield (0, db_1.addUser)(userData, languagesData, userName);
                    }
                    break;
                case "2":
                    yield (0, db_2.displayAllUsersInDb)();
                    break;
                case "3":
                    userLocation = yield getUserInput("\nLocation of the GitHub to show on the command-line:\n");
                    yield (0, db_3.displayUsersByLocation)("location", userLocation);
                    break;
                case "4":
                    userLanguage = yield getUserInput("\nProgramming language:\n");
                    // Convert input to JSON
                    jsonString = JSON.stringify(userLanguage);
                    yield (0, db_4.displayUsersByProgLang)(jsonString);
                    break;
                default:
                    console.log("Not a valid option.");
                    break;
            }
        }
        process.exit();
    });
}
main();
