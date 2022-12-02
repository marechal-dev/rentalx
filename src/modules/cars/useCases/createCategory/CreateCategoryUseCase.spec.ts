import { AppError } from "@Errors/AppError";

import { CategoriesRepositoryInMemory } from "@Modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "@Modules/cars/useCases/createCategory/CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category Use Case", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});

	it("should be able to create a new category.", async () => {
		const category = {
			name: "Category Test",
			description: "Category Teste Description",
		};

		await createCategoryUseCase.execute(category);

		const createdCategory = await categoriesRepositoryInMemory.findByName(
			category.name
		);

		expect(createdCategory).toHaveProperty("id");
	});

	it("should not be able to create a new category with duplicated name.", async () => {
		expect(async () => {
			const category = {
				name: "Category Test",
				description: "Category Teste Description",
			};

			await createCategoryUseCase.execute(category);
			await createCategoryUseCase.execute(category);
		}).rejects.toBeInstanceOf(AppError);
	});
});
