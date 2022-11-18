import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersAdmin1668726261673 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumns("users", [
			{
				oldColumn: new TableColumn({
					name: "username",
					type: "varchar",
				}),
				newColumn: new TableColumn({
					name: "username",
					type: "varchar",
					isUnique: true,
				}),
			},
			{
				oldColumn: new TableColumn({
					name: "email",
					type: "varchar",
				}),
				newColumn: new TableColumn({
					name: "email",
					type: "varchar",
					isUnique: true,
				}),
			},
			{
				oldColumn: new TableColumn({
					name: "driver_license",
					type: "varchar",
				}),
				newColumn: new TableColumn({
					name: "driver_license",
					type: "varchar",
					isUnique: true,
				}),
			},
			{
				oldColumn: new TableColumn({
					name: "admin",
					type: "boolean",
				}),
				newColumn: new TableColumn({
					name: "admin",
					type: "boolean",
					default: false,
				}),
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumns("users", [
			"username",
			"email",
			"driver_license",
			"admin",
		]);
	}
}
