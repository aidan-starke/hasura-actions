import type { ApiPromise } from "@polkadot/api";
import type { Request, Response } from "express";

import { execute } from "@/libs/utils";
import { GET_FULL_BLOCK } from "@/libs/constants";

export const GetFullBlock =
	(api: ApiPromise) => async (req: Request, res: Response) => {
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
	};
