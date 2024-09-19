import { WALLETS_CONFIG } from "@/shared/wallets-config/wallets-config";
import { HighloadWalletForm } from "@/widgets/HighloadWalletForm/HighloadWalletForm";

export default async function Home() {
	// prevent private keys getting into the frontend
	const wallets = WALLETS_CONFIG.map((c) => ({ address: c.address }));

	return <HighloadWalletForm wallets={wallets} />;
}
