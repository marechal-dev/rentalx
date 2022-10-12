import { parse } from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}

class ImportCategoriesUseCase {
	public constructor(private categoriesRepository: CategoriesRepository) {}

	async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];

			const parseFile = parse();

			stream.pipe(parseFile);

			parseFile
				.on("data", async (line: string[]) => {
					const [name, description] = line;

					categories.push({
						name,
						description,
					});
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (error) => {
					reject(error);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const categoryDoesNotExists = !this.categoriesRepository.findByName(name);

			if (categoryDoesNotExists) {
				this.categoriesRepository.create({
					name,
					description,
				});
			}
		});
	}
}

export { ImportCategoriesUseCase };
