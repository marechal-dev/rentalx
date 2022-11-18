import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const fileUploader = multer({
	dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

// GET routes
categoriesRoutes.get("/", listCategoriesController.handle);

// POST Routes
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post(
	"/import",
	fileUploader.single("categoriesListFile"),
	importCategoriesController.handle
);

export { categoriesRoutes };
