import { config as useDotEnv } from "dotenv";
import express from "express";
import { serve, setup } from "swagger-ui-express";

import { createConnection } from "./database/data-source";
import "./shared/container";
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

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
