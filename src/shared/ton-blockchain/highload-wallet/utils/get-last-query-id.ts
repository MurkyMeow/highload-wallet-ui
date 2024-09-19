import z from "zod";

import { HighloadQueryId } from "@/app/lib/highload-wallet-v3/wrappers/HighloadQueryId";

import { tonapiClient } from "../../api/ton-api";
import { toRawAddress } from "../../utils/address";

const decodedBodySchema = z.object({
	msg: z.object({
		query_id: z.object({
			shift: z.number(),
			bit_number: z.number(),
		}),
	}),
});

export async function getLastQueryId(
	address: string,
): Promise<HighloadQueryId> {
	const { traces } = await tonapiClient.accounts.getAccountTraces(
		toRawAddress(address),
		{
			limit: 10,
		},
	);

	for (const traceId of traces) {
		const trace = await tonapiClient.traces.getTrace(traceId.id);

		const body = decodedBodySchema.parse(
			trace.transaction.in_msg?.decoded_body,
		);

		const { shift, bit_number } = body.msg.query_id;

		return HighloadQueryId.fromShiftAndBitNumber(
			BigInt(shift),
			BigInt(bit_number),
		);
	}

	throw new Error(
		"Could not find a query id (does the wallet have recent outgoing transactions?)",
	);
}
