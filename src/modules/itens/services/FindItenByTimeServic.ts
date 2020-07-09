import { injectable, inject } from 'tsyringe';

import Iten from '@modules/itens/infra/typeorm/entities/Iten';
import IItenRepository from '@modules/itens/repositories/IItensRepository';

interface IRequest {
  construction_id: string;
  time: string;
}

@injectable()
class FindItenService {
  constructor(
    @inject('ItensRepository')
    private itensRepository: IItenRepository,
  ) {}

  public async execute({
    time,
    construction_id,
  }: IRequest): Promise<Iten[] | undefined> {
    const itens = await this.itensRepository.findByTime(time, construction_id);

    return itens || undefined;
  }
}

export default FindItenService;
