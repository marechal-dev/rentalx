import { v4 as generateUUIDv4 } from "uuid";

class Specification {
	id?: string;
	name: string;
	description: string;
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = generateUUIDv4();
		}
	}
}

export { Specification };
