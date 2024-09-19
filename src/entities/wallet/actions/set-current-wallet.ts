import { create } from "../wallet.internal";
import { CurrentWallet } from "../wallet.types";

export const setCurrentWallet = create<CurrentWallet>("setCurrentWallet");
