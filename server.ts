import { execute } from "@/libs/utils";
import express, { type Express } from "express";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { GET_BLOCK_WITH_VALIDATOR } from "@/libs/constants";

const app = express();
const port = process.env.PORT || 3000;

const main = async (server: Express) => {
	const wsProvider = new WsProvider(
		"wss://polkadot.api.onfinality.io/public-ws"
	);
	const api = await ApiPromise.create({ provider: wsProvider });

	server.post("/GetBlockWithValidator", async (req, res) => {
		try {
			const { blockHash } = req.body.input;

			const header = await api.derive.chain.getHeader(blockHash);

			const { data, errors } = await execute(
				GET_BLOCK_WITH_VALIDATOR,
				req.headers,
				{
					blockHash,
				}
			);

			if (errors) return res.status(400).json(errors[0]);

			return res.json({
				...data.update_app_blocks,
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