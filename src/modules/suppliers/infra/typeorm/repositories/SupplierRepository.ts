import { getRepository, Repository, Like } from 'typeorm';

import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

class SupplierRepository implements ISupplierRepository {
  private ormRespository: Repository<Supplier>;

  constructor() {
    this.ormRespository = getRepository(Supplier);
  }

  public async findByCNPJ(
    cnpj: string,
    user_id: string,
  ): Promise<Supplier | undefined> {
    const findSupplier = await this.ormRespository.findOne({
      where: { cnpj, user_id },
    });

    return findSupplier || undefined;
  }

  public async findByCPF(
    cpf: string,
    user_id: string,
  ): Promise<Supplier | undefined> {
    const findSupplier = await this.ormRespository.findOne({
      where: { cnpj: cpf, user_id },
    });

    return findSupplier || undefined;
  }

  public async findByUser(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Supplier[] | undefined> {
    const findSupplier = await this.ormRespository.find({
      where: { user_id },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['iten'],
    });

    return findSupplier || undefined;
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    const findSupplier = await this.ormRespository.findOne(id);

    return findSupplier || undefined;
  }

  public async search(
    word: string,
    user_id: string,
  ): Promise<Supplier[] | undefined> {
    const findCNPJ = await this.ormRespository.find({
      where: { cnpj: Like(`%${word}%`), user_id },
    });

    if (findCNPJ.length === 0) {
      const findName = await this.ormRespository.find({
        where: { name: Like(`%${word}%`), user_id },
      });

      if (findCNPJ.length === 0) {
        const findPhone = await this.ormRespository.find({
          where: { phone: Like(`%${word}%`), user_id },
        });

        if (findPhone.length === 0) {
          const findEmail = await this.ormRespository.find({
            where: { email: Like(`%${word}%`), user_id },
          });

          if (findEmail.length === 0) {
            const findCEP = await this.ormRespository.find({
              where: { cep: Like(`%${word}%`), user_id },
            });

            if (findCEP.length === 0) {
              const findState = await this.ormRespository.find({
                where: { state: Like(`%${word}%`), user_id },
              });

              if (findState.length === 0) {
                const findCity = await this.ormRespository.find({
                  where: { city: Like(`%${word}%`), user_id },
                });

                if (findCity.length === 0) {
                  const findAddress = await this.ormRespository.find({
                    where: { address: Like(`%${word}%`), user_id },
                  });

                  return findAddress || undefined;
                }

                return findCity || undefined;
              }

              return findState || undefined;
            }

            return findCEP || undefined;
          }

          return findEmail || undefined;
        }

        return findPhone || undefined;
      }

      return findName || undefined;
    }

    return findCNPJ || undefined;
  }

  public async findByEmail(
    email: string,
    user_id: string,
  ): Promise<Supplier | undefined> {
    const findSupplier = await this.ormRespository.findOne({
      where: { email, user_id },
    });

    return findSupplier || undefined;
  }

  public async create({
    name,
    email,
    cnpj,
    phone,
    cep,
    city,
    state,
    address,
    user_id,
  }: ICreateSupplierDTO): Promise<Supplier> {
    const newSupplier = this.ormRespository.create({
      name,
      email,
      cnpj,
      phone,
      cep,
      state,
      city,
      address,
      user_id,
    });

    await this.ormRespository.save(newSupplier);

    return newSupplier;
  }

  public async merge(suppllier: Supplier): Promise<Supplier> {
    const updatedSupplier = await this.ormRespository.save(suppllier);

    return updatedSupplier || undefined;
  }
}

export default SupplierRepository;
