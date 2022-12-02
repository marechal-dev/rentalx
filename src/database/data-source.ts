import "reflect-metadata";

import { DataSource } from "typeorm";

import { User } from "@Modules/accounts/entities/User";
import { Category } from "@Modules/cars/entities/Category";
import { Specification } from "@Modules/cars/entities/Specification";

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "docker",
	password: "1234",
	database: "rentalx",
	entities: [Category, Specification, User],
	migrations: ["./src/database/migrations/*.ts"],
});

export function createConnection(host = "database"): Promise<DataSource> {
	return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
