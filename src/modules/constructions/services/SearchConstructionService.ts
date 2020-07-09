import { injectable, inject } from 'tsyringe';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  user_id: string;
  word: string;
}

@injectable()
class IndexConstructionService {
  constructor(
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({
    user_id,
    word,
  }: IRequest): Promise<Construction[] | undefined> {
    const constructions = await this.constructionsRepository.search(
      word,
      user_id,
    );

    return constructions || undefined;
  }
}

export default IndexConstructionService;
