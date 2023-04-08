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
const fs_1 = __importDefault(require("fs"));
const web3_1 = __importDefault(require("web3"));
require("dotenv").config();
const express = require('express');
const app = express();
const web3 = new web3_1.default("http://localhost:7545");
const contractABI = JSON.parse(fs_1.default.readFileSync(process.env.ABI, "utf8"));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield contract.methods.getUsers().call());
}));
app.get('/users/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield contract.methods.getUser(userId).call();
    res.send(user);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, points } = req.body;
    const accounts = yield web3.eth.getAccounts();
    const account = accounts[0];
    // Check if user already exists
    const userExists = yield contract.methods.getUser(userId).call();
    if (userExists !== "0") {
        // User already exists, update points
        res.send(yield contract.methods.updateUserPoints(userId, points).send({ from: account, gas: 1000000 }));
    }
    else {
        // User does not exist, add new user
        res.send(yield contract.methods.addUser(userId, points).send({ from: account, gas: 1000000 }));
    }
}));
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
