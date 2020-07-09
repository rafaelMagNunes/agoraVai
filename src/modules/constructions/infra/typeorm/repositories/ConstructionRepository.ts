import { getRepository, Repository, Like } from 'typeorm';

import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

import ICreateConstructionsDTO from '@modules/constructions/dtos/ICreateConstructionsDTO';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';

class ConstructionsRepository implements IConstructionsRepository {
  private ormRespository: Repository<Construction>;

  constructor() {
    this.ormRespository = getRepository(Construction);
  }

  public async findByAddress(
    address: string,
    cep: string,
    user_id: string,
  ): Promise<Construction | undefined> {
    const findConstruction = await this.ormRespository.findOne({
      where: { address, user_id, cep },
    });

    return findConstruction || undefined;
  }

  public async search(
    word: string,
    user_id: string,
  ): Promise<Construction[] | undefined> {
    const findAddress = await this.ormRespository.find({
      where: { address: Like(`%${word}%`), user_id },
    });

    if (findAddress.length === 0) {
      const findConstruction = await this.ormRespository.find({
        where: { construction: Like(`%${word}%`), user_id },
      });

      if (findConstruction.length === 0) {
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

            return findCity || undefined;
          }

          return findState || undefined;
        }

        return findCEP || undefined;
      }

      return findConstruction || undefined;
    }

    return findAddress || undefined;
  }

  public async findById(
    details: string,
    id: string,
  ): Promise<Construction | undefined> {
    if (details === 'true') {
      const findConstruction = await this.ormRespository.findOne({
        where: { id },
        relations: ['iten', 'iten.supplier'],
      });

      return findConstruction || undefined;
    }

    const findConstruction = await this.ormRespository.findOne(id);

    return findConstruction || undefined;
  }

  public async findByUser(
    user_id: string,
    page: number,
    limit = 6,
  ): Promise<Construction[] | undefined> {
    const findConstruction = await this.ormRespository.find({
      take: limit,
      skip: (page - 1) * limit,
      where: { user_id },
      order: {
        start_date: 'DESC',
      },
      select: [
        'address',
        'construction',
        'id',
        'start_date',
        'city',
        'state',
        'cep',
      ],
    });

    return findConstruction || undefined;
  }

  public async create({
    construction,
    address,
    start_date,
    cep,
    state,
    city,
    user_id,
  }: ICreateConstructionsDTO): Promise<Construction> {
    const newConstruction = this.ormRespository.create({
      construction,
      address,
      start_date,
      cep,
      state,
      city,
      user_id,
    });

    await this.ormRespository.save(newConstruction);

    return newConstruction;
  }

  public async merge(construction: Construction): Promise<Construction> {
    const updateConstruction = this.ormRespository.save(construction);

    return updateConstruction;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRespository.delete(id);
  }
}

export default ConstructionsRepository;
