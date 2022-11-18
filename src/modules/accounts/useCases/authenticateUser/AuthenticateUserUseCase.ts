import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		const userDoesNotExists = !user;
		if (userDoesNotExists) {
			throw new AppError("Email or password incorrect!", 403);
		}

		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new AppError("Email or password incorrect!", 403);
		}

		const token = sign(
			{
				user: {
					name: user.name,
					email: user.email,
				},
			},
			"20063cf1c6fa446090d81fe6c6242d4c",
			{
				subject: user.id,
				expiresIn: "1d",
			}
		);

		const responsePayload = {
			user: {
				name: user.name,
				email: user.email,
			},
			token,
		};

		return responsePayload;
	}
}

export { AuthenticateUserUseCase };
