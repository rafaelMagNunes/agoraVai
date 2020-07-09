import { injectable, inject } from 'tsyringe';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  user_id: string;
  page: number;
  limit: number;
}

@injectable()
class IndexConstructionService {
  constructor(
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({
    user_id,
    page,
    limit,
  }: IRequest): Promise<Construction[] | undefined> {
    const constructions = await this.constructionsRepository.findByUser(
      user_id,
      page,
      limit,
    );

    return constructions || undefined;
  }
}

export default IndexConstructionService;
