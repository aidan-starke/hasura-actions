import { ApiPromise, WsProvider } from "@polkadot/api";

export const getApiInstance = async (
	apiEndpoint: string
): Promise<ApiPromise> => {
	const wsProvider = new WsProvider(apiEndpoint);
	return await ApiPromise.create({ provider: wsProvider });
};
