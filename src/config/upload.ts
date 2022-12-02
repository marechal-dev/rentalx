import { randomBytes } from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
	upload(folder: string) {
		return {
			storage: multer.diskStorage({
				destination: resolve(__dirname, "..", "..", folder),
				filename: (req, file, callback) => {
					const fileHash = randomBytes(16).toString();

					const fileName = `${fileHash}-${file.originalname}`;

					return callback(null, fileName);
				},
			}),
		};
	},
};
