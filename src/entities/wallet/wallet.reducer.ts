import { reducerWithInitialState } from "typescript-fsa-reducers";

import { setCurrentWallet } from "./actions/set-current-wallet";
import { WalletState } from "./wallet.types";

const INITIAL_STATE: WalletState = {};

export function getWalletReducer() {
	return reducerWithInitialState(INITIAL_STATE).case(
		setCurrentWallet,
		(state, payload) => {
			return {
				...state,
				wallet: payload,
			};
		},
	);
}
