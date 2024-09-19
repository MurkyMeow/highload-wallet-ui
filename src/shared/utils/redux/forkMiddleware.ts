import { MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "typescript-fsa";

import { Middleware } from "./types/Middleware";

export const forkMiddleware =
	(
		mdFactory: (
			api: MiddlewareAPI<ThunkDispatch<any, any, AnyAction>>,
		) => (action: AnyAction) => unknown,
	): Middleware =>
	(api) => {
		const md = mdFactory(api);

		return (next) => (action) => {
			Promise.resolve()
				.then(() => {
					return md(action);
				})
				.catch((err) => {
					console.error(err);
				});

			return next(action);
		};
	};
