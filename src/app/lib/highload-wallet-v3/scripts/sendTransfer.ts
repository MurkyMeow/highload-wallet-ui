import { beginCell, toNano, internal as internal_relaxed, Address, SendMode } from '@ton/core';
import { HighloadWalletV3 } from '../wrappers/HighloadWalletV3';
import { NetworkProvider } from '@ton/blueprint';
import { getRandomInt } from '../utils';
import { HighloadQueryId } from '../wrappers/HighloadQueryId';
import { DEFAULT_TIMEOUT, SUBWALLET_ID, maxShift } from '../tests/imports/const';

import { mnemonicToWalletKey } from 'ton-crypto';
import { promptAddress } from '../utils/ui';

export async function run(provider: NetworkProvider) {
    // Load mnemonic from .env file
    const mnemonic = process.env.WALLET_MNEMONIC!.split(' ');
    const keyPair = await mnemonicToWalletKey(mnemonic);

    const highloadWalletV3Address = await promptAddress('Enter your highload-wallet-v3 address: ', provider.ui());
    const highloadWalletV3 = provider.open(HighloadWalletV3.createFromAddress(highloadWalletV3Address));

    console.log('The message transmission will take some time. Please be patient and wait.');
    console.log('Sending msg...');

    let queryId = HighloadQueryId.fromQueryId(0n);

    while (true) {
        console.log(queryId);
        queryId = queryId.getNext();
        await new Promise((resolve) => setTimeout(resolve, 1));
    }

    while (true) {
        try {
            // const queryId = .getNext();

            // You can pack your own messages here
            // const testBody = beginCell().storeUint(0, 32).storeStringTail('Test highload-wallet-v3').endCell();

            await highloadWalletV3.sendExternalMessage(keyPair.secretKey, {
                query_id: queryId,
                message: internal_relaxed({
                    to: Address.parse('UQCRwSELWmHlrfNc-eARN-eViXYwPwLS_8Gl2WlgzyTfJDdl'),
                    bounce: false,
                    value: toNano('0.935'),
                    // body: testBody,
                }),
                createdAt: Math.floor(Date.now() / 1000) - 10,
                mode: SendMode.PAY_GAS_SEPARATELY,
                subwalletId: SUBWALLET_ID,
                timeout: DEFAULT_TIMEOUT,
            });
            console.log('Success');
            break;
        } catch (e) {
            console.log(e);
            // Sleep for 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}
