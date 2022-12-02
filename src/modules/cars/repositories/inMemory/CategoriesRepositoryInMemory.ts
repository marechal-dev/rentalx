import { Category } from "../../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	private categories: Category[];

	public constructor() {
		this.categories = [];
	}

	public async findByName(name: string): Promise<Category> {
		const category = this.categories.find((category) => category.name === name);

		return category;
	}

	public async list(): Promise<Category[]> {
		return this.categories;
	}

	public async create({
		name,
		description,
	}: ICreateCategoryDTO): Promise<void> {
		const category = new Category();

		Object.assign(category, { name, description });

		this.categories.push(category);
	}
}

export { CategoriesRepositoryInMemory };
