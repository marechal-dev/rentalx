import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { importCategoriesController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/index";

const categoriesRoutes = Router();

const fileUploader = multer({
	dest: "./temp",
});

// GET routes
categoriesRoutes.get("/", (request, response) => {
	return listCategoriesController.handle(request, response);
});

// POST Routes
categoriesRoutes.post("/", (request, response) => {
	return createCategoryController.handle(request, response);
});

categoriesRoutes.post(
	"/import",
	fileUploader.single("categoriesListFile"),
	(request, response) => {
		return importCategoriesController.handle(request, response);
	}
);

export { categoriesRoutes };
