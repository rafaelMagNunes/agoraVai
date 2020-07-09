import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  construction?: string;
  address?: string;
  start_date?: Date;
  construction_id: string;
  state: string;
  cep: string;
  city: string;
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
    construction_id,
    state,
    cep,
    city,
    user_id,
  }: IRequest): Promise<Construction> {
    const updateConstruction = await this.constructionsRepository.findById(
      'false',
      construction_id,
    );

    if (!updateConstruction) {
      throw new AppError('Construction not found');
    }

    if (address && address !== updateConstruction.address) {
      const constructionExists = await this.constructionsRepository.findByAddress(
        address,
        cep,
        user_id,
      );

      if (constructionExists) {
        throw new AppError('Construction already exists');
      }

      updateConstruction.address = address;
      updateConstruction.cep = cep;
    }

    if (construction) {
      updateConstruction.construction = construction;
    }

    if (start_date) {
      updateConstruction.start_date = start_date;
    }

    if (state) {
      updateConstruction.state = state;
    }

    if (city) {
      updateConstruction.city = city;
    }

    const updatedConstruction = await this.constructionsRepository.merge(
      updateConstruction,
    );

    return updatedConstruction;
  }
}

export default CreateConstructionService;
