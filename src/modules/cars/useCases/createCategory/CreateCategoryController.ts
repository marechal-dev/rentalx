import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
	private createCategoryUseCase: CreateCategoryUseCase;
	
	constructor(createCategoryUseCase) {
		this.createCategoryUseCase = CreateCategoryUseCase;
	}

	handle(request: Request, response: Response) {
		const { name, description } = request.body;

		const createCategoryService = new CreateCategoryService(categoriesRepository);

		createCategoryService.execute({ name, description });

		return response.status(201).send();
	}
}

export { CreateCategoryController };
