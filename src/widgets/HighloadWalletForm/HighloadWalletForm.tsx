"use client";

import { Flex } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

import { selectCurrentWallet } from "@/entities/wallet/wallet.selectors";
import { TransferForm } from "@/features/transfer/ui/TransferForm/TransferForm";

import { WalletSelector } from "./components/WalletSelector/WalletSelector";

export const HighloadWalletForm = memo(function HighloadWalletForm(props: {
	wallets: { address: string }[];
}) {
	const { wallets } = props;

	const currentWallet = useSelector(selectCurrentWallet);

	return (
		<Flex vertical gap="middle">
			<WalletSelector wallets={wallets} />

			{currentWallet && (
				<>
					<TransferForm address={currentWallet.address} />
				</>
			)}
		</Flex>
	);
});
