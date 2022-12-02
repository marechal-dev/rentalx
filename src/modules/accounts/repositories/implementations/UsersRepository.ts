import { Repository } from "typeorm";

import AppDataSource from "@Database/data-source";

import { ICreateUserDTO } from "@Modules/accounts/dtos/ICreateUserDTO";
import { User } from "@Modules/accounts/entities/User";
import { IUsersRepository } from "@Modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
	private readonly repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async create({
		id,
		name,
		email,
		password,
		driver_license,
		avatar,
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			id,
			name,
			email,
			password,
			driver_license,
			avatar,
		});

		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({
			where: {
				email,
			},
		});

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne({ where: { id } });

		return user;
	}
}

export { UsersRepository };
