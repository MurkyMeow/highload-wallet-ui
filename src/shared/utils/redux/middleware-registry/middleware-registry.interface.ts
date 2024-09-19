import { Middleware } from "../types/Middleware";

export interface IMiddlewareRegistry {
	register: (middleware: Middleware[]) => void;
}
