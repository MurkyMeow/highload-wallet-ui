import { IMiddlewareRegistry } from "@/shared/utils/redux/middleware-registry/middleware-registry.interface";
import { IReducerRegistry } from "@/shared/utils/redux/reducer-registry/reducer-registry.interface";

import { STORE_NAME } from "./wallet.internal";
import { getWalletReducer } from "./wallet.reducer";

export function registerWalletModule(options: {
	middlewareRegistry: IMiddlewareRegistry;
	reducerRegistry: IReducerRegistry;
}) {
	const {
		// middlewareRegistry,
		reducerRegistry,
	} = options;

	// middlewareRegistry.register([writeBalanceChangesToGoogleDocsMiddleware]);

	reducerRegistry.register({
		name: STORE_NAME,
		reducer: getWalletReducer(),
	});
}
