import Constructions from '@modules/constructions/infra/typeorm/entities/Construction';

import ICreateConstructionsDTO from '@modules/constructions/dtos/ICreateConstructionsDTO';

export default interface IConstructionsRepository {
  create(data: ICreateConstructionsDTO): Promise<Constructions>;
  findByAddress(
    address: string,
    cep: string,
    user_id: string,
  ): Promise<Constructions | undefined>;
  search(word: string, user_id: string): Promise<Constructions[] | undefined>;
  findById(details: string, id: string): Promise<Constructions | undefined>;
  findByUser(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Constructions[] | undefined>;
  merge(construction: Constructions | undefined): Promise<Constructions>;
  remove(id: string): Promise<void>;
}
