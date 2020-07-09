import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class ConstructionsRepository implements IUsersRepository {
  private ormRespository: Repository<User>;

  constructor() {
    this.ormRespository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRespository.findOne({
      where: { email },
    });

    return findUser || undefined;
  }

  public async save(user: User): Promise<User> {
    await this.ormRespository.save(user);

    return user;
  }

  public async create({ email, password }: ICreateUsersDTO): Promise<User> {
    const newUser = this.ormRespository.create({
      email,
      password,
    });

    return newUser;
  }
}

export default ConstructionsRepository;
