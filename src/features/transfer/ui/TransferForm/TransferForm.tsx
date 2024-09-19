import { useMutation } from "@tanstack/react-query";
import {
	Button,
	Card,
	Flex,
	Form,
	Input,
	InputNumber,
	notification,
	Spin,
} from "antd";
import { memo } from "react";
import { useEventCallback } from "usehooks-ts";

import { createTransferServer } from "./utils/create-transfer.server";

export const TransferForm = memo(function TransferForm(props: {
	address: string;
}) {
	const { address } = props;

	const { isPending, mutateAsync } = useMutation({
		mutationFn(options: {
			fromAddr: string;
			toAddr: string;
			currency: string;
			amount: number;
			comment?: string;
		}) {
			return createTransferServer(options);
		},
	});

	const handleFormFinish = useEventCallback(
		async (data: {
			toAddr: string;
			amount: number;
			currency: string;
			comment?: string;
		}) => {
			if (address) {
				try {
					await mutateAsync({
						fromAddr: address,
						toAddr: data.toAddr,
						currency: data.currency,
						amount: data.amount,
						comment: data.comment,
					});

					notification.success({ message: `Create transfer succeeded` });
				} catch (err) {
					console.log(err);

					notification.error({
						message: `Create transfer failed (see console logs)`,
					});
				}
			}
		},
	);

	return (
		<Card title="Transfer">
			<Form onFinish={handleFormFinish}>
				<Form.Item name="toAddr" label="To address" required>
					<Input placeholder="EQCIQrEYh3PSg7Pd5BNUrQKal1MycG5Dd8CLXhfwoOfutdF7" />
				</Form.Item>

				<Form.Item name="amount" label="Amount" required>
					<InputNumber placeholder="100" />
				</Form.Item>

				<Form.Item name="currency" label="Currency" required>
					<Input placeholder="USDT" />
				</Form.Item>

				<Form.Item name="comment" label="Comment">
					<Input placeholder="12312" />
				</Form.Item>

				<Flex vertical align="flex-start">
					<Spin spinning={isPending}>
						<Button
							htmlType="submit"
							disabled={isPending || !address}
							type="primary"
						>
							Send
						</Button>
					</Spin>
				</Flex>
			</Form>
		</Card>
	);
});
