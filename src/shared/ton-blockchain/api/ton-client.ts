import { TonClient } from "@ton/ton";
import env from "env-var";

const endpoint = "https://toncenter.com/api/v2/jsonRPC";

const TONCENTER_API_KEY = env
	.from({
		TONCENTER_API_KEY: process.env.TONCENTER_API_KEY,
	})
	.get("TONCENTER_API_KEY")
	.required()
	.asString();

export const tonClient = new TonClient({
	endpoint,
	apiKey: TONCENTER_API_KEY,
});
