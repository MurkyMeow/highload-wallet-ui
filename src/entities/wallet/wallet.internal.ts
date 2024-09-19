import asyncFactory from "@fractal-web/typescript-fsa-redux-thunk";
import actionCreatorFactory from "typescript-fsa";

export const STORE_NAME = "wallet";

export const create = actionCreatorFactory(STORE_NAME);

export const createAsync = asyncFactory(create);
