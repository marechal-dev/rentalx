import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const fileUploader = multer(uploadConfig.upload("./temp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
	"/avatar",
	ensureAuthenticated,
	fileUploader.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRoutes };
