import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Iten from '@modules/itens/infra/typeorm/entities/Iten';
import IItenRepository from '@modules/itens/repositories/IItensRepository';

interface IRequest {
  date?: Date;
  description?: string;
  payment_type?: string;
  self_life_date?: Date | null;
  value?: number;
  iten_id: string;
}
@injectable()
class UpdateItenService {
  constructor(
    @inject('ItensRepository')
    private itensRepository: IItenRepository,
  ) {}

  public async execute({
    date,
    description,
    payment_type,
    value,
    self_life_date = null,
    iten_id,
  }: IRequest): Promise<Iten> {
    const updateIten = await this.itensRepository.findById(iten_id);

    if (!updateIten) {
      throw new AppError('Iten not found');
    }

    updateIten.date = date || updateIten.date;
    updateIten.description = description || updateIten.description;
    updateIten.payment_type = payment_type || updateIten.payment_type;
    updateIten.value = value || updateIten.value;
    updateIten.self_life_date = self_life_date || updateIten.self_life_date;

    const updatedIten = await this.itensRepository.merge(updateIten);

    return updatedIten;
  }
}

export default UpdateItenService;
