import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const { authorization } = request.headers;

	if (!authorization) {
		throw new AppError("Token missing!", 401);
	}

	const [, token] = authorization.split(" ");

	try {
		const { sub: userId } = verify(
			token,
			"20063cf1c6fa446090d81fe6c6242d4c"
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = await usersRepository.findById(userId);

		if (!user) {
			throw new AppError("User does not exists!", 401);
		}

		next();
	} catch (error) {
		throw new AppError("Invalid Token!", 401);
	}
}

export { ensureAuthenticated };
