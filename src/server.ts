import { config as useDotEnv } from "dotenv";
import express from "express";
import { serve, setup } from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

useDotEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/api-docs", serve, setup(swaggerFile));

app.use(router);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
