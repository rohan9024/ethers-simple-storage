"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.env = exports.schema = void 0;
const ts_dotenv_1 = require("ts-dotenv");
exports.schema = {
    PK: {
        type: String,
        default: "3ddc0ef8e26b137c390f2225c8434e97f7c1c7a08707b1fa0c6fd54322ad323b",
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
