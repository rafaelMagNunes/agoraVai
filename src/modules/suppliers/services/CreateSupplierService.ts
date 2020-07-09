import { injectable, inject } from 'tsyringe';
import { cnpj as CNPJ, cpf as CPF } from 'cpf-cnpj-validator';

import AppError from '@shared/errors/AppError';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  phone: string;
  name: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  cnpj?: string;
  address: string;
  user_id: string;
}

@injectable()
class CreateItenService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({
    phone,
    name,
    email,
    cnpj,
    city,
    state,
    cep,
    address,
    user_id,
  }: IRequest): Promise<Supplier> {
    let validateDocument = '';

    if (cnpj) {
      if (CNPJ.isValid(cnpj, false)) {
        validateDocument = CNPJ.format(cnpj);
        const supplierExists = await this.supplierRepository.findByCNPJ(
          validateDocument,
          user_id,
        );

        if (supplierExists) {
          throw new AppError('Supplier already exists');
        }
      } else if (CPF.isValid(cnpj, false)) {
        validateDocument = CPF.format(cnpj);
        const supplierExists = await this.supplierRepository.findByCPF(
          validateDocument,
          user_id,
        );

        if (supplierExists) {
          throw new AppError('Supplier already exists');
        }
      } else {
        throw new AppError('Cnpj invalid', 401);
      }
    }

    const newSupplier = this.supplierRepository.create({
      phone,
      name,
      email,
      cnpj,
      state,
      city,
      cep,
      address,
      user_id,
    });

    return newSupplier;
  }
}

export default CreateItenService;
