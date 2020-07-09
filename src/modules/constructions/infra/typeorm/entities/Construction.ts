import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Iten from '@modules/itens/infra/typeorm/entities/Iten';

@Entity('constructions')
class Construction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  construction: string;

  @Column()
  address: string;

  @Column()
  start_date: Date;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.construction)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Iten, iten => iten.construction)
  iten: Iten[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Construction;
