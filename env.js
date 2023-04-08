"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.env = exports.schema = void 0;
const ts_dotenv_1 = require("ts-dotenv");
exports.schema = {
    PK: {
        type: String,
        default: "0x5161b0263416d82092830ce563b2ce2ddcdded1697c6293f0d6d6e05a16c610b",
    },
    PK_PASS: {
        type: String,
        default: "password2000",
    },
    RPC: {
        type: String,
        default: "http://127.0.0.1:7545",
    },
    ABI: {
        type: String,
        default: "dist/_Users_darshand_Documents_Projects_web3_ethers-simple-storage_SimpleStorage_sol_SimpleStorage.abi",
    },
    BINARY: {
        type: String,
        default: "dist/_Users_darshand_Documents_Projects_web3_ethers-simple-storage_SimpleStorage_sol_SimpleStorage.bin",
    },
};
function loadEnv() {
    exports.env = (0, ts_dotenv_1.load)(exports.schema);
}
exports.loadEnv = loadEnv;
