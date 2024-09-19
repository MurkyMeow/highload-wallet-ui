import { MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "typescript-fsa";

export type Middleware = (
	api: MiddlewareAPI<ThunkDispatch<any, any, AnyAction>, unknown>,
) => (next: (action: unknown) => unknown) => (action: AnyAction) => void;
