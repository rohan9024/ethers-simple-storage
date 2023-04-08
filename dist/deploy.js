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
const ethers_1 = require("ethers");
require("dotenv").config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC);
        const wallet = new ethers_1.ethers.Wallet(process.env.PK, provider);
        const abi = fs_1.default.readFileSync(process.env.ABI, "utf8");
        const binary = fs_1.default.readFileSync(process.env.BINARY, "utf8");
        const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
        const contract = yield contractFactory.deploy();
        // console.log("contract", contract);
        yield contract.deployTransaction.wait(1);
        const currentFavoriteNumber = yield contract.retrieve();
        console.log("fav num = ", currentFavoriteNumber.toString());
        const transactionResponse = yield contract.store("7");
        const transactionReceipt = yield transactionResponse.wait(1);
        console.log("transactionReceipt", transactionReceipt);
        const updatedFavoriteNumber = yield contract.retrieve();
        console.log("updated fav num", updatedFavoriteNumber);
    });
}
main().then(() => console.log("deployed!"));
