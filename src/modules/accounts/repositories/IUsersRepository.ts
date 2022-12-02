import { ICreateUserDTO } from "@Modules/accounts/dtos/ICreateUserDTO";
import { User } from "@Modules/accounts/entities/User";

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}

export { IUsersRepository };
