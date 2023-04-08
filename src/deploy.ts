import fs, { PathOrFileDescriptor } from "fs";
import { ethers, Wallet } from "ethers";

require("dotenv").config();

async function main() {
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

  const currentFavoriteNumber = await contract.retrieve();
  console.log("fav num = ", currentFavoriteNumber.toString());

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  console.log("transactionReceipt", transactionReceipt);

  const updatedFavoriteNumber = await contract.retrieve();
  console.log("updated fav num", updatedFavoriteNumber);
}

main().then(() => console.log("deployed!"));
