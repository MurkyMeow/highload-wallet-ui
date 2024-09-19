import { AppStoreState } from "./app-store.types";

export const selectApp = (store: any): AppStoreState => store.app;
