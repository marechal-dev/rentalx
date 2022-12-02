import { inject, injectable } from "tsyringe";

import { Specification } from "@Modules/cars/entities/Specification";
import { SpecificationsRepository } from "@Modules/cars/repositories/implementations/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: SpecificationsRepository
	) {}

	async execute(): Promise<Specification[]> {
		const specifications = await this.specificationsRepository.list();

		return specifications;
	}
}

export { ListSpecificationsUseCase };
