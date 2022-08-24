import type { ApiPromise } from "@polkadot/api";
import type { Request, Response } from "express";

import { execute } from "@/libs/utils";
import { GET_BLOCK_WITH_VALIDATOR } from "@/libs/constants";

export const getBlockWithValidator =
	(api: ApiPromise) => async (req: Request, res: Response) => {
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
	};
