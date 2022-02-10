import { Specification } from "../../model/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
	private specificationsRepository: ISpecificationsRepository;

	constructor(specificationsRepository: SpecificationsRepository) {
		this.specificationsRepository = specificationsRepository;
	}

	execute(): Specification[] {
		const specifications = this.specificationsRepository.list();

		return specifications;
	}
}

export { ListSpecificationsUseCase };
