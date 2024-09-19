import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

import { registerWalletModule } from "@/entities/wallet/wallet.module";
import { MiddlewareRegistry } from "@/shared/utils/redux/middleware-registry/middleware-registry";
import { ReducerRegistry } from "@/shared/utils/redux/reducer-registry/reducer-registry";

import { appStoreReducer } from "./app/app-store.reducer";

const reducerRegistry = new ReducerRegistry();
const middlewareRegistry = new MiddlewareRegistry();

registerWalletModule({
	reducerRegistry,
	middlewareRegistry,
});

export const store = createStore<any, any>(
	combineReducers({
		app: appStoreReducer,
		...reducerRegistry.combineReducersArg(),
	}),
	applyMiddleware(...([thunk, ...middlewareRegistry.elements()] as any)),
);
