import type { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			const authenticateUserUseCase = container.resolve(
				AuthenticateUserUseCase
			);

			const payload = await authenticateUserUseCase.execute({
				email,
				password,
			});

			return response.status(200).json(payload);
		} catch (error) {
			return response.status(403).json({ error: error.message });
		}
	}
}

export { AuthenticateUserController };
