import { Middleware } from "../types/Middleware";
import { IMiddlewareRegistry } from "./middleware-registry.interface";

export class MiddlewareRegistry implements IMiddlewareRegistry {
	private middlewares: Middleware[] = [];

	register(middleware: Middleware[]) {
		this.middlewares.push(...middleware);
	}

	elements() {
		return this.middlewares;
	}
}
