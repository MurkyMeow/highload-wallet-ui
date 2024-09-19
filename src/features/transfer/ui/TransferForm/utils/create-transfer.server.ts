"use server";

import { createTransfer } from "@/shared/ton-blockchain/highload-wallet/utils/create-transfer";
import { WALLETS_CONFIG } from "@/shared/wallets-config/wallets-config";

export async function createTransferServer(options: {
	fromAddr: string;
	toAddr: string;
	currency: string;
	amount: number;
	comment?: string;
}) {
	const { amount, currency, fromAddr, toAddr, comment } = options;

	const wallet = WALLETS_CONFIG.find((w) => w.address === fromAddr);

	if (!wallet) {
		throw new Error(`Wallet ${fromAddr} is not found in the WALLETS_CONFIG`);
	}

	const r = await createTransfer({
		amount,
		currency,
		memo: comment || "",
		walletAddress: fromAddr,
		toAddr,
		secretKey: wallet.privateKey,
	});

	return r;
}
