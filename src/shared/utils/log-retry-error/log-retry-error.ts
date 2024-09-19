import { Attempt } from "./Attempt";

export function logRetryError(error: unknown): boolean {
	if (!(error instanceof Attempt)) {
		console.log(error);
	}

	return true;
}
