import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Iten from '@modules/itens/infra/typeorm/entities/Iten';
import IItenRepository from '@modules/itens/repositories/IItensRepository';
import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  date: Date;
  description: string;
  supplier_id: string;
  payment_type: string;
  self_life_date: Date | null;
  value: number;
  construction_id: string;
}

@injectable()
class CreateItenService {
  constructor(
    @inject('ItensRepository')
    private itensRepository: IItenRepository,
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({
    date,
    description,
    supplier_id,
    payment_type,
    value,
    self_life_date = null,
    construction_id,
  }: IRequest): Promise<Iten> {
    const itenExists = await this.itensRepository.findByIten(
      date,
      description,
      supplier_id,
      payment_type,
      construction_id,
    );

    if (itenExists) {
      throw new AppError('Iten already exists');
    }

    const construction = await this.constructionsRepository.findById(
      'false',
      construction_id,
    );

    if (!construction) {
      throw new AppError('Construction does not exists');
    }

    const newIten = this.itensRepository.create({
      date,
      description,
      supplier_id,
      payment_type,
      self_life_date,
      value,
      construction_id,
    });

    return newIten;
  }
}

export default CreateItenService;
