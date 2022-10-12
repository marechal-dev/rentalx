import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
	public constructor(
		private importCategoriesUseCase: ImportCategoriesUseCase
	) {}

	public handle(request: Request, response: Response): Response {
		const { file } = request;

		this.importCategoriesUseCase.execute(file);

		return response.status(201).send();
	}
}

export { ImportCategoriesController };
