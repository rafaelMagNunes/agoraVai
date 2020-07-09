import { injectable, inject } from 'tsyringe';

import Iten from '@modules/itens/infra/typeorm/entities/Iten';
import IItenRepository from '@modules/itens/repositories/IItensRepository';

interface IRequest {
  construction_id: string;
  word: string;
}

@injectable()
class SearchItenService {
  constructor(
    @inject('ItensRepository')
    private itensRepository: IItenRepository,
  ) {}

  public async execute({
    construction_id,
    word,
  }: IRequest): Promise<Iten[] | undefined> {
    const itens = await this.itensRepository.search(word, construction_id);

    return itens || undefined;
  }
}

export default SearchItenService;
