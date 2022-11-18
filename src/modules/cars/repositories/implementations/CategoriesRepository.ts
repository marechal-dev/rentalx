import { Repository } from "typeorm";

import AppDataSource from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private readonly repository: Repository<Category>;

	constructor() {
		this.repository = AppDataSource.getRepository(Category);
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const newCategory: Category = this.repository.create({
			name,
			description,
		});

		await this.repository.save(newCategory);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();

		return categories;
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({
			where: {
				name,
			},
		});

		return category;
	}
}

export { CategoriesRepository };
