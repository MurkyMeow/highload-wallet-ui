import dedustAssets from "./dedust-assets.json";

export function getCurrencyDigits(currency: string): number {
	const digits = dedustAssets.find((x) => x.symbol === currency)?.decimals;

	if (!digits) {
		throw new Error(`Unknown currency: ${currency}`);
	}

	return digits;
}
