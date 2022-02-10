import { Category } from "../../model/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private categories: Category[];

	private static INSTANCE: CategoriesRepository;

	private constructor() {
		this.categories = [];
	}

	public static getIntance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository();
		}

		return CategoriesRepository.INSTANCE;
	}

	create({ name, description }: ICreateCategoryDTO): void {
		const newCategory: Category = new Category();

		Object.assign(newCategory, {
			name,
			description,
			created_at: new Date(),
		});

		this.categories.push(newCategory);
	}

	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category {
		const category = this.categories.find((category) => category.name === name);

		return category;
	}
}

export { CategoriesRepository };
