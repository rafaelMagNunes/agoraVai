import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';

export default interface ISupplierRepository {
  create(data: ICreateSupplierDTO): Promise<Supplier>;
  findByCNPJ(cnpj: string, user_id: string): Promise<Supplier | undefined>;
  findByCPF(cpf: string, user_id: string): Promise<Supplier | undefined>;
  findByUser(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Supplier[] | undefined>;
  search(word: string, user_id: string): Promise<Supplier[] | undefined>;
  findById(supplier_id: string): Promise<Supplier | undefined>;
  findByEmail(email: string, user_id: string): Promise<Supplier | undefined>;
  merge(supplier: Supplier): Promise<Supplier>;
}
