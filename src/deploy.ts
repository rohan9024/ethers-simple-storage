import fs, { PathOrFileDescriptor } from "fs";
import { ethers, Wallet } from "ethers";
import * as dotenv from 'dotenv';

dotenv.config();



async function main() {
  console.log('process.env.PK', process.env.PK, process.env.ABI, process.env.BINARY);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
  const wallet = new ethers.Wallet(process.env.PK as string, provider);
  const abi = fs.readFileSync(process.env.ABI as PathOrFileDescriptor, "utf8");
  const binary = fs.readFileSync(
    process.env.BINARY as PathOrFileDescriptor,
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  // console.log("contract", contract);
  await contract.deployTransaction.wait(1);
  console.log("Transaction confirmed.");

  console.log("Contract address:", contract.address);

}

main().then(() => console.log("deployed!"));
