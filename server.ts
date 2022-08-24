import bodyParser from "body-parser";
import { execute } from "@/libs/utils";
import express, { type Express } from "express";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
	API_ENDPOINT,
	GET_BLOCK_WITH_VALIDATOR,
	GET_FULL_BLOCK,
} from "@/libs/constants";

const app = express();
const port = process.env.PORT || 3000;

const main = async (server: Express) => {
	const wsProvider = new WsProvider(API_ENDPOINT);
	const api = await ApiPromise.create({ provider: wsProvider });

	server.post("/GetBlockWithValidator", bodyParser.json(), async (req, res) => {
		try {
			const { blockHash } = req.body.input;

			const header = await api.derive.chain.getHeader(blockHash);

			const { data, errors } = await execute(GET_BLOCK_WITH_VALIDATOR, {
				blockHash,
			});
			if (errors) return res.status(400).json(errors[0]);

			return res.json({
				...data.app_blocks[0],
				validator: header.author.toString(),
			});
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
	});

	server.post("/GetFullBlock", bodyParser.json(), async (req, res) => {
		try {
			const { id } = req.body.input;

			const { data, errors } = await execute(GET_FULL_BLOCK, {
				id,
			});
			if (errors) return res.status(400).json(errors[0]);

			const header = await api.derive.chain.getHeader(
				data.app_blocks_by_pk.hash
			);

			return res.json({
				...data.app_blocks_by_pk,
				validator: header.author.toString(),
			});
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
	});

	server.listen(port, () =>
		console.log(`Server is listening on port ${port}.`)
	);
};

main(app).catch((err) => console.log(err));
