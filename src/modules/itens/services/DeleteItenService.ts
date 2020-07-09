import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IItenRepository from '@modules/itens/repositories/IItensRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteItenService {
  constructor(
    @inject('ItensRepository')
    private itensRepository: IItenRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const itenExist = await this.itensRepository.findById(id);

    if (!itenExist) {
      throw new AppError('Iten do not exist');
    }

    await this.itensRepository.remove(id);
  }
}

export default DeleteItenService;
