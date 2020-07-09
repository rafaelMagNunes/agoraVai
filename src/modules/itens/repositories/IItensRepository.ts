import Iten from '@modules/itens/infra/typeorm/entities/Iten';

import ICreateItensDTO from '@modules/itens/dtos/ICreateItenDTO';

export default interface IItensRepository {
  create(data: ICreateItensDTO): Promise<Iten>;
  findByIten(
    date: Date,
    description: string,
    supplier_id: string,
    payment_type: string,
    construction_id: string,
  ): Promise<Iten | undefined>;
  findById(id: string): Promise<Iten | undefined>;
  findByTime(
    time: string,
    construction_id: string,
  ): Promise<Iten[] | undefined>;
  merge(iten: Iten): Promise<Iten>;
  remove(id: string): Promise<void>;
  search(word: string, construction_id: string): Promise<Iten[] | undefined>;
}
