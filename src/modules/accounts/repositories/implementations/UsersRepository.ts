import { Repository } from "typeorm";

import AppDataSource from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
	private readonly repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async create({
		name,
		email,
		password,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			name,
			email,
			password,
			driver_license,
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
