import { reducerWithInitialState } from "typescript-fsa-reducers";

import { AppStoreState } from "./app-store.types";

const INITIAL_STATE: AppStoreState = {};

export const appStoreReducer = reducerWithInitialState(INITIAL_STATE).build();
