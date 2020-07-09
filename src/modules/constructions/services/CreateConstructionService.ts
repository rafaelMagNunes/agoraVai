import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  construction: string;
  address?: string;
  start_date?: Date;
  cep?: string;
  state?: string;
  city?: string;
  user_id: string;
}

@injectable()
class CreateConstructionService {
  constructor(
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({
    construction,
    address,
    start_date,
    state,
    city,
    cep,
    user_id,
  }: IRequest): Promise<Construction> {
    if (address && cep) {
      const constructionExists = await this.constructionsRepository.findByAddress(
        address,
        cep,
        user_id,
      );

      if (constructionExists) {
        throw new AppError('Constr already exists', 400);
      }
    }

    const newConstruction = await this.constructionsRepository.create({
      construction,
      address,
      start_date,
      cep,
      state,
      city,
      user_id,
    });

    return newConstruction;
  }
}

export default CreateConstructionService;
