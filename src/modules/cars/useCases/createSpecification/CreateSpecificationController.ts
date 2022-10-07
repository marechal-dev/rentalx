import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

interface ICreateSpecficationRequestBody {
	name: string;
	description: string;
}

interface ICreateSpecificationRequest extends Request {
	body: ICreateSpecficationRequestBody;
}

class CreateSpecificationController {
	constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

	handle(request: ICreateSpecificationRequest, response: Response): Response {
		const { name, description } = request.body;

		this.createSpecificationUseCase.execute({ name, description });

		return response.status(201).send();
	}
}

export { CreateSpecificationController };
