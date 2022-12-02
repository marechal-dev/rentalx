import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "@Modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

class CreateSpecificationController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description } = request.body;

			const createSpecificationUseCase = container.resolve(
				CreateSpecificationUseCase
			);

			await createSpecificationUseCase.execute({ name, description });

			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}
}

export { CreateSpecificationController };
