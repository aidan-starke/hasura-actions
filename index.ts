import express from "express";
import bodyParser from "body-parser";
import { getApiInstance } from "@/libs/utils";
import { API_ENDPOINT } from "@/libs/constants";
import { getBlockWithValidator, getFullBlock } from "@/libs/routes";

const app = express();
const port = process.env.PORT || 3000;

getApiInstance(API_ENDPOINT)
	.then((api) => {
		const routes = {
			GetBlockWithValidator: () => getBlockWithValidator(api),
			GetFullBlock: () => getFullBlock(api),
		};

		Object.keys(routes).forEach((route) =>
			app.post(`/${route}`, bodyParser.json(), routes[route]())
		);

		app.listen(port, () => console.log(`Server is listening on port ${port}.`));
	})
	.catch((err) => console.log(err));
