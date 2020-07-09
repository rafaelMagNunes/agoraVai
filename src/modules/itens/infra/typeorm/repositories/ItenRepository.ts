import { getRepository, Repository, Like, Between } from 'typeorm';
import {
  addDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfHour,
  endOfMonth,
  startOfMonth,
} from 'date-fns';

import IItensRepository from '@modules/itens/repositories/IItensRepository';

import ICreateItensDTO from '@modules/itens/dtos/ICreateItenDTO';

import Iten from '@modules/itens/infra/typeorm/entities/Iten';

class ItensRepository implements IItensRepository {
  private ormRespository: Repository<Iten>;

  constructor() {
    this.ormRespository = getRepository(Iten);
  }

  public async findByIten(
    date: Date,
    description: string,
    supplier: string,
    payment_type: string,
    construction_id: string,
  ): Promise<Iten | undefined> {
    const findItens = await this.ormRespository.findOne({
      where: {
        date,
        description,
        supplier,
        payment_type,
        construction_id,
      },
    });

    return findItens || undefined;
  }

  public async create({
    date,
    description,
    supplier_id,
    payment_type,
    self_life_date,
    value,
    construction_id,
  }: ICreateItensDTO): Promise<Iten> {
    const newIten = this.ormRespository.create({
      date,
      description,
      supplier_id,
      payment_type,
      self_life_date,
      value,
      construction_id,
    });

    await this.ormRespository.save(newIten);

    return newIten;
  }

  public async findById(id: string): Promise<Iten | undefined> {
    const findIten = await this.ormRespository.findOne({
      where: { id },
    });

    return findIten || undefined;
  }

  public async merge(iten: Iten): Promise<Iten> {
    const updatedIten = await this.ormRespository.save(iten);

    return updatedIten;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRespository.delete(id);
  }

  public async search(
    word: string,
    construction_id: string,
  ): Promise<Iten[] | undefined> {
    const findName = await this.ormRespository.find({
      where: { description: Like(`%${word}%`), construction_id },
      relations: ['supplier'],
    });

    return findName || undefined;
  }

  public async findByTime(
    time: string,
    construction_id: string,
  ): Promise<Iten[] | undefined> {
    let findItens: Iten[] = [];

    if (time === 'today') {
      findItens = await this.ormRespository.find({
        where: {
          self_life_date: Between(startOfDay(new Date()), endOfDay(new Date())),
          construction_id,
        },
        relations: ['supplier'],
      });

      return findItens || undefined;
    }

    if (time === 'tomorrow') {
      findItens = await this.ormRespository.find({
        where: {
          self_life_date: Between(
            startOfDay(addDays(new Date(), 1)),
            endOfDay(addDays(new Date(), 1)),
          ),
          construction_id,
        },
        relations: ['supplier'],
      });

      return findItens || undefined;
    }

    if (time === 'this week') {
      findItens = await this.ormRespository.find({
        where: {
          self_life_date: Between(
            startOfWeek(new Date()),
            endOfWeek(new Date()),
          ),
          construction_id,
        },
        relations: ['supplier'],
      });

      return findItens || undefined;
    }

    if (time === 'this month') {
      findItens = await this.ormRespository.find({
        where: {
          self_life_date: Between(
            startOfMonth(new Date()),
            endOfMonth(new Date()),
          ),
          construction_id,
        },
        relations: ['supplier'],
      });

      return findItens || undefined;
    }

    return findItens || undefined;
  }
}

export default ItensRepository;
