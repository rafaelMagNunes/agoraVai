import { injectable, inject } from 'tsyringe';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  user_id: string;
  word: string;
}

@injectable()
class IndexConstructionService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISupplierRepository,
  ) {}

  public async execute({
    user_id,
    word,
  }: IRequest): Promise<Supplier[] | undefined> {
    const suppliers = await this.suppliersRepository.search(word, user_id);

    return suppliers || undefined;
  }
}

export default IndexConstructionService;
