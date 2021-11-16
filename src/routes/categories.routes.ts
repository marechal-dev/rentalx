import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
	
});

categoriesRoutes.get("/", (request, response) => {
	const allCategories = categoriesRepository.list();

	return response.json(allCategories);
});

export { categoriesRoutes };
