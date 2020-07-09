import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Construction, construction => construction.user)
  construction: Construction;

  @OneToMany(() => Supplier, supplier => supplier.user)
  supplier: Supplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
