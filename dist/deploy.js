"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('process.env.PK', process.env.PK, process.env.ABI, process.env.BINARY);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC);
        const wallet = new ethers_1.ethers.Wallet(process.env.PK, provider);
        const abi = fs_1.default.readFileSync(process.env.ABI, "utf8");
        const binary = fs_1.default.readFileSync(process.env.BINARY, "utf8");
        const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
        const contract = yield contractFactory.deploy();
        // console.log("contract", contract);
        yield contract.deployTransaction.wait(1);
        console.log("Transaction confirmed.");
        console.log("Contract address:", contract.address);
    });
}
main().then(() => console.log("deployed!"));
