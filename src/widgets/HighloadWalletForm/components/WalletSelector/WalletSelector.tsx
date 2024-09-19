import { Form, Select } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

import { setCurrentWallet } from "@/entities/wallet/actions/set-current-wallet";
import { selectCurrentWallet } from "@/entities/wallet/wallet.selectors";
import { useDispatch } from "@/shared/utils/redux/useDispatch";

export const WalletSelector = memo(function WalletSelector(props: {
	wallets: { address: string }[];
}) {
	const { wallets } = props;

	const currentWallet = useSelector(selectCurrentWallet);

	const dispatch = useDispatch();

	return (
		<Form>
			<Form.Item label="Select wallet">
				<Select
					options={wallets.map((w) => ({
						label: w.address.slice(-8),
						value: w.address,
					}))}
					value={currentWallet?.address}
					onChange={(newAddress) =>
						dispatch(setCurrentWallet({ address: newAddress }))
					}
					style={{ width: 150 }}
				/>
			</Form.Item>
		</Form>
	);
});
