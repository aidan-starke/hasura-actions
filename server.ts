import bodyParser from "body-parser";
import { API_ENDPOINT } from "@/libs/constants";
import express, { type Express } from "express";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { GetBlockWithValidator, GetFullBlock } from "@/libs/routes";

const app = express();
const port = process.env.PORT || 3000;

const main = async (server: Express) => {
	const wsProvider = new WsProvider(API_ENDPOINT);
	const api = await ApiPromise.create({ provider: wsProvider });

	const getBlockWithValidatorRoute = () => GetBlockWithValidator(api);
	server.post(
		"/GetBlockWithValidator",
		bodyParser.json(),
		getBlockWithValidatorRoute()
	);

	const getFullBlockRoute = () => GetFullBlock(api);
	server.post("/GetFullBlock", bodyParser.json(), getFullBlockRoute());

	server.listen(port, () =>
		console.log(`Server is listening on port ${port}.`)
	);
};

main(app).catch((err) => console.log(err));
