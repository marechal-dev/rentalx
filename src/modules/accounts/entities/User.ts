import { randomUUID } from "crypto";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("users")
class User {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	driver_license: string;

	@Column()
	admin: boolean;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = randomUUID();
		}
	}
}

export { User };
