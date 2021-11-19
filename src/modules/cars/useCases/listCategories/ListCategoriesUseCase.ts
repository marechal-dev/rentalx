import { Category } from "../../model/Category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
