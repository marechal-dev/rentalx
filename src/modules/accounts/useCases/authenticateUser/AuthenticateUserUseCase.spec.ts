import { AppError } from "@Errors/AppError";

import { UsersRepositoryInMemory } from "@Modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "@Modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@Modules/accounts/useCases/createUser/CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User Use Case", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
	});

	it("should be able to authenticate an user.", async () => {
		const user = {
			name: "John Doe",
			email: "johnDoe@gmail.com",
			password: "12345",
			driver_license: "12345678",
		};

		await createUserUseCase.execute(user);

		const response = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(response).toHaveProperty("token");
	});

	it("should not be able to authenticate a nonexistent user.", () => {
		expect(async () => {
			const user = {
				email: "johnDoe@gmail.com",
				password: "12345",
			};

			await authenticateUserUseCase.execute({
				email: user.email,
				password: user.password,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able authenticate an user with wrong email.", () => {
		expect(async () => {
			const user = {
				name: "John Doe",
				email: "johnDoe@gmail.com",
				password: "12345",
				driver_license: "12345678",
			};
			const wrongEmail = "john@gmail.com";

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: wrongEmail,
				password: user.password,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate an user with wrong password.", () => {
		expect(async () => {
			const user = {
				name: "John Doe",
				email: "johnDoe@gmail.com",
				password: "12345",
				driver_license: "12345678",
			};
			const wrongPassword = "123456";

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: wrongPassword,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
