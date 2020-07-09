import { injectable, inject } from 'tsyringe';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  user_id: string;
  page: number;
  limit: number;
}
@injectable()
class CreateItenService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({
    user_id,
    limit,
    page,
  }: IRequest): Promise<Supplier[] | undefined> {
    const suppliers = await this.supplierRepository.findByUser(
      user_id,
      page,
      limit,
    );

    return suppliers || undefined;
  }
}

export default CreateItenService;
