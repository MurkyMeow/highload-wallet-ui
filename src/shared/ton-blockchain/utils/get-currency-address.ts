import dedustAssets from "./dedust-assets.json";

export function getCurrencyAddress(currency: string): string {
	const asset = dedustAssets.find((x) => x.symbol === currency);

	if (!asset) {
		throw new Error(`Uknown currency: ${currency}`);
	}

	const address = `${asset.type === "jetton" ? "jetton:" : ""}${asset.rawAddress}`;

	return address;
}
