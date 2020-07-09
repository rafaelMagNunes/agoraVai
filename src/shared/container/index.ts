import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRespository';

import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';
import ConstructionsRepository from '@modules/constructions/infra/typeorm/repositories/ConstructionRepository';

import IItensRepository from '@modules/itens/repositories/IItensRepository';
import ItensRepository from '@modules/itens/infra/typeorm/repositories/ItenRepository';

import ISuppliersRepository from '@modules/suppliers/repositories/ISupplierRepository';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IConstructionsRepository>(
  'ConstructionsRepository',
  ConstructionsRepository,
);

container.registerSingleton<IItensRepository>(
  'ItensRepository',
  ItensRepository,
);

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);
