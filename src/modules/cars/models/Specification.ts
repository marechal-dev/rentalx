import { randomUUID } from "crypto";

class Specification {
	id?: string;
	name: string;
	description: string;
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = randomUUID();
		}
	}
}

export { Specification };
