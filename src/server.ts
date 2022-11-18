import { config as useDotEnv } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { serve, setup } from "swagger-ui-express";

import { createConnection } from "./database/data-source";
import "./shared/container";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection()
	.then(async () => console.log("Connected to PostgreSQL!"))
	.catch((error) => console.log(`Error: ${error.message}`));

useDotEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/api-docs", serve, setup(swaggerFile));

app.use(router);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({ error: err.message });
		}

		return response.status(500).json({
			stauts: "error",
			message: `Internal Server Error: ${err.message}`,
		});
	}
);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
