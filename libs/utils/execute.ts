import { HASURA_SECRET } from "@/libs/constants";

// Execute the parent operation in hasura
export const execute = async (
	query: string,
	variables: Record<string, unknown>
): Promise<any> => {
	const fetchResponse = await fetch(
		"https://svc-explorer-test.hasura.app/v1/graphql",
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			headers: {
				"x-hasura-admin-secret": HASURA_SECRET,
			},
		}
	);
	const data = await fetchResponse.json();

	return data;
};
