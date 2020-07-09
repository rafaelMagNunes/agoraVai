import { injectable, inject } from 'tsyringe';
import { cnpj as CNPJ, cpf as CPF } from 'cpf-cnpj-validator';

import AppError from '@shared/errors/AppError';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  phone?: string;
  name?: string;
  email?: string;
  cnpj?: string;
  state?: string;
  city?: string;
  address?: string;
  cep?: string;
  supplier_id: string;
  user_id: string;
}
@injectable()
class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({
    phone,
    name,
    email,
    cnpj,
    state,
    address,
    cep,
    city,
    supplier_id,
    user_id,
  }: IRequest): Promise<Supplier> {
    if (cnpj) {
      if (!CNPJ.isValid(cnpj, false) && !CPF.isValid(cnpj, false)) {
        throw new AppError('Document invalid', 401);
      }
    }

    const updateSupplier = await this.supplierRepository.findById(supplier_id);

    if (!updateSupplier) {
      throw new AppError('Supplier does not exists');
    }

    if (updateSupplier.iten) {
      throw new AppError('Suppler can not be deleted');
    }

    if (cnpj && updateSupplier.cnpj !== cnpj) {
      const supplierExists = await this.supplierRepository.findByCNPJ(
        cnpj,
        user_id,
      );

      if (supplierExists) {
        throw new AppError('Supplier already exists');
      }
    }

    updateSupplier.phone = phone || updateSupplier.phone;
    updateSupplier.name = name || updateSupplier.name;
    updateSupplier.email = email || updateSupplier.email;
    updateSupplier.cnpj = cnpj || updateSupplier.cnpj;
    updateSupplier.state = state || updateSupplier.state;
    updateSupplier.city = city || updateSupplier.city;
    updateSupplier.address = address || updateSupplier.address;
    updateSupplier.cep = cep || updateSupplier.cep;

    return updateSupplier;
  }
}

export default UpdateSupplierService;
