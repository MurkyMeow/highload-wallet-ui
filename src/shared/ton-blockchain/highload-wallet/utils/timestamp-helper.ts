import dayjs from "dayjs";

class TimestampHelper {
	private prev: number | undefined;

	getNow() {
		const { prev } = this;

		let next = dayjs().unix() - 100;

		while (prev && prev >= next) {
			next += 1;
		}

		this.prev = next;

		return next;
	}
}

/**
 * Generate unique timestamps on each call
 * (critically important to not have the same timestamps for highload wallet transactions)
 */
export const timestampHelper = new TimestampHelper();
