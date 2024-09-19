import { pipe } from "rambda";

import { STORE_NAME } from "./wallet.internal";
import { WalletState } from "./wallet.types";

export const selectWalletState = (store: any): WalletState => store[STORE_NAME];

export const selectCurrentWallet = pipe(
	selectWalletState,
	(state) => state.wallet,
);
