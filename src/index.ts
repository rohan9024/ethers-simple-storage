import fs, { PathOrFileDescriptor } from "fs";
import { AbiItem } from 'web3-utils';
import Web3 from "web3";
require("dotenv").config();
const express = require('express');
import { Request, Response } from 'express';

const app = express();

const web3 = new Web3("http://localhost:7545");
const contractABI: AbiItem = JSON.parse(fs.readFileSync(process.env.ABI as PathOrFileDescriptor, "utf8"));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS as string);

app.get('/users', async (req: Request, res: Response) => {
	res.send(await contract.methods.getUsers().call());
});

app.get('/users/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const user = await contract.methods.getUser(userId).call();
	res.send(user);
});
app.post('/users', async (req: Request, res: Response) => {
	const { userId, points } = req.body;
	const accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	// Check if user already exists
	const userExists = await contract.methods.getUser(userId).call();
	if (userExists !== "0") {
		// User already exists, update points
		res.send(await contract.methods.updateUserPoints(userId, points).send({ from: account, gas: 1000000 }));
	} else {
		// User does not exist, add new user
		res.send(await contract.methods.addUser(userId, points).send({ from: account, gas: 1000000 }));
	}
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
