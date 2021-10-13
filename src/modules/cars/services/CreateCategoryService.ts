import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
	name: string;
	description: string;
}

/**
 * TODO: Definir tipo de retorno
 * DONE: Alterar retorno de erro
 * TODO: Tratar erro
 * TODO: Acessar o repositório
 * TODO: Retornar algo
 */
class CreateCategoryService {
	private categoriesRepository: ICategoriesRepository;

	constructor(categoriesRepository: ICategoriesRepository) {
		this.categoriesRepository = categoriesRepository;
	}

	execute({ name, description }: IRequest): void {
		const categoryAlreadyExists = this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new Error("Category already exists!");
		}

		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryService };
