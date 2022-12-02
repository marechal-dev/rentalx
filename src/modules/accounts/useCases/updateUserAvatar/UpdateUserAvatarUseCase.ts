import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/removeFile";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	userId: string;
	avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	public constructor(
		@inject("UsersRepository") private usersRepository: IUsersRepository
	) {}

	public async execute({ userId, avatarFile }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(userId);

		if (user.avatar) {
			await deleteFile(`./temp/avatar/${user.avatar}`);
		}

		user.avatar = avatarFile;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
