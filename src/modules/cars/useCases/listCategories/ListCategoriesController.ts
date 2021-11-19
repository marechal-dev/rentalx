import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	private listCategoryUseCase: ListCategoriesUseCase;

	constructor(listCategoryUseCase: ListCategoriesUseCase) {
		this.listCategoryUseCase = listCategoryUseCase;
	}

	handle(request: Request, response: Response): Response {
		const allCategories = this.listCategoryUseCase.execute();

		return response.json(allCategories);
	}
}

export { ListCategoriesController };
