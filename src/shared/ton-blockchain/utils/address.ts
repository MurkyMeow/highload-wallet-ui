import TonWeb from "tonweb";

export function toRawAddress(address: string) {
	return new TonWeb.utils.Address(address).toString(false, false, true);
}

export function toFriendlyAddress(address: string) {
	return new TonWeb.utils.Address(address).toString(true, true, true);
}
