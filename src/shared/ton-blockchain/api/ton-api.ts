import { Api, HttpClient } from "@ton-api/client";
import env from "env-var";

const TONAPI_API_KEY = env
	.from({
		TONAPI_API_KEY: process.env.TONAPI_API_KEY,
	})
	.get("TONAPI_API_KEY")
	.required()
	.asString();

export function getTonapiClient() {
	const tonapiHttp = new HttpClient({
		baseUrl: "https://tonapi.io",
		baseApiParams: {
			headers: {
				Authorization: `Bearer ${TONAPI_API_KEY}`,
				"Content-type": "application/json",
			},
		},
	});

	return new Api(tonapiHttp);
}

export const tonapiClient = getTonapiClient();
