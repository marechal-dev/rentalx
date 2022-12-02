import { ICreateUserDTO } from "@Modules/accounts/dtos/ICreateUserDTO";
import { User } from "@Modules/accounts/entities/User";
import { IUsersRepository } from "@Modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	private users: User[] = [];

	public async create({
		name,
		email,
		password,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, { name, email, password, driver_license });

		this.users.push(user);
	}

	public async findByEmail(email: string): Promise<User> {
		const user = this.users.find((user) => user.email === email);

		return user;
	}

	public async findById(id: string): Promise<User> {
		const user = this.users.find((user) => user.id === id);

		return user;
	}
}

export { UsersRepositoryInMemory };
