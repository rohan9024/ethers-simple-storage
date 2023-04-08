import fs from "fs";
import { ethers } from "ethers";
require("dotenv").config();

async function main() {
  console.log(process.env.PK, process.env.PK_PASS);
  const wallet = new ethers.Wallet(process.env.PK as string);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PK_PASS as string,
    process.env.PK
  );
  fs.writeFileSync("./encryptedKey.json", encryptedJsonKey);
}

main();
