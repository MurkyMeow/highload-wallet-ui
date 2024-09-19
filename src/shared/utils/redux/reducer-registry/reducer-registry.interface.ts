import type { AnyAction } from "typescript-fsa";

export interface IReducerRegistryItem {
	name: string;
	reducer: (state: any, action: AnyAction) => any;
}

export interface IReducerRegistry {
	register: (options: IReducerRegistryItem) => void;
}
