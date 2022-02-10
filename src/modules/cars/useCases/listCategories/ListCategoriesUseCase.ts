import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

class ListCategoriesUseCase {
	private categoriesRepository: ICategoriesRepository;

	constructor(categoriesRepository: CategoriesRepository) {
		this.categoriesRepository = categoriesRepository;
	}

	execute(): Category[] {
		const categories = this.categoriesRepository.list();

		return categories;
	}
}

export { ListCategoriesUseCase };
