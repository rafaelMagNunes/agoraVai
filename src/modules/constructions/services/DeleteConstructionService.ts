import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteItenService {
  constructor(
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const constructionExist = await this.constructionsRepository.findById(
      'false',
      id,
    );

    if (!constructionExist) {
      throw new AppError('Construction do not exist');
    }

    await this.constructionsRepository.remove(id);
  }
}

export default DeleteItenService;
