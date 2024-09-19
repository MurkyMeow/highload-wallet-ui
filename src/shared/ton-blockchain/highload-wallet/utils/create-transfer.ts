import { Address, beginCell, Cell, internal } from "@ton/core";
import { JettonMaster } from "@ton/ton";
import env from "env-var";
import TonWeb from "tonweb";
import { retry } from "ts-retry-promise";

import { HighloadWalletV3 } from "@/lib/highload-wallet-v3/wrappers/HighloadWalletV3";
import { logRetryError } from "@/shared/utils/log-retry-error/log-retry-error";

import { tonClient } from "../../api/ton-client";
import { getCurrencyAddress } from "../../utils/get-currency-address";
import { getCurrencyDigits } from "../../utils/get-currency-digits";
import { getLastQueryId } from "./get-last-query-id";
import { timestampHelper } from "./timestamp-helper";

const TONCENTER_API_KEY = env
	.from({
		TONCENTER_API_KEY: process.env.TONCENTER_API_KEY,
	})
	.get("TONCENTER_API_KEY")
	.required()
	.asString();

const SUBWALLET_ID = 239;
const HIGHLOAD_WALLET_TIMEOUT = 60 * 60;

export async function createTransfer(options: {
	walletAddress: string;
	secretKey: string;
	amount: number;
	currency: string;
	toAddr: string;
	memo: string;
}) {
	const {
		walletAddress,
		secretKey,
		amount,
		currency,
		toAddr,
		memo: comment,
	} = options;

	const endpoint = "https://toncenter.com/api/v2/jsonRPC";

	const provider = new TonWeb.HttpProvider(endpoint, {
		apiKey: TONCENTER_API_KEY,
	});

	const payload = new Uint8Array([
		...new Uint8Array(4),
		...new TextEncoder().encode(comment),
	]);

	const highloadWalletV3 = HighloadWalletV3.createFromAddress(
		Address.parse(walletAddress),
	);

	const client = tonClient;

	const highloadWalletV3Contract = client.open(highloadWalletV3);

	const queryId = await getLastQueryId(walletAddress);

	if (currency !== "TON") {
		const amountDecimal = Math.round(
			amount * 10 ** getCurrencyDigits(currency),
		);

		const jettonMaster = client.open(
			JettonMaster.create(Address.parse(getCurrencyAddress(currency))),
		);

		const jettonWalletAddress = (
			await jettonMaster.getWalletAddress(Address.parse(walletAddress))
		).toString();

		const jettonWallet = new TonWeb.token.jetton.JettonWallet(provider, {
			address: jettonWalletAddress,
		});

		const transferBody = await jettonWallet.createTransferBody({
			// typescript typings are wrong here;
			// it's `jettonAmount` instead of `tokenAmount`
			["jettonAmount" as any]: new TonWeb.utils.BN(String(amountDecimal)),
			tokenAmount: 0 as any,

			responseAddress: new TonWeb.utils.Address(walletAddress),
			toAddress: new TonWeb.utils.Address(toAddr),
			forwardAmount: TonWeb.utils.toNano("0.01"),
			forwardPayload: payload,
		});

		await retry(
			async () => {
				await highloadWalletV3Contract.sendExternalMessage(
					Buffer.from(secretKey, "base64"),
					{
						query_id: queryId,
						message: internal({
							to: jettonWalletAddress,
							value: TonWeb.utils.toNano("0.05") as any,
							body: Cell.fromBase64(
								TonWeb.utils.bytesToBase64(await transferBody.toBoc()),
							),
						}),
						createdAt: timestampHelper.getNow(),
						mode: 3,
						subwalletId: SUBWALLET_ID,
						timeout: HIGHLOAD_WALLET_TIMEOUT,
					},
				);
			},
			{
				retryIf: logRetryError,
				timeout: "INFINITELY",
				retries: "INFINITELY",
				delay: 1000,
			},
		);
	} else {
		const amountDecimal = Math.round(amount * 10 ** 9);

		await retry(
			async () => {
				const body = beginCell()
					.storeUint(0, 32)
					.storeStringTail(comment)
					.endCell();

				await highloadWalletV3Contract.sendExternalMessage(
					Buffer.from(secretKey, "base64"),
					{
						query_id: queryId,
						message: internal({
							to: toAddr,
							value: new TonWeb.utils.BN(String(amountDecimal)) as any,
							body,
						}),
						createdAt: timestampHelper.getNow(),
						mode: 3,
						subwalletId: SUBWALLET_ID,
						timeout: HIGHLOAD_WALLET_TIMEOUT,
					},
				);
			},
			{
				retryIf: logRetryError,
				timeout: "INFINITELY",
				retries: "INFINITELY",
				delay: 1000,
			},
		);
	}

	return {
		ok: true,
	};
}
