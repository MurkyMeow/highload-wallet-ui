import {
	IReducerRegistry,
	IReducerRegistryItem,
} from "./reducer-registry.interface";

export class ReducerRegistry implements IReducerRegistry {
	private elements: IReducerRegistryItem[] = [];

	register(options: IReducerRegistryItem) {
		this.elements.push(options);
	}

	combineReducersArg() {
		return Object.fromEntries(
			this.elements.map((el) => [el.name, el.reducer] as const),
		);
	}
}
