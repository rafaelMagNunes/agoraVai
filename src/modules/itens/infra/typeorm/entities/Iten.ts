import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Construction from '@modules/constructions/infra/typeorm/entities/Construction';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

@Entity('itens')
class Iten {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  supplier_id: string;

  @Column()
  value: number;

  @Column()
  self_life_date: Date;

  @Column()
  payment_type: string;

  @Column()
  construction_id: string;

  @ManyToOne(() => Construction, construction => construction.iten)
  @JoinColumn({ name: 'construction_id' })
  construction: Construction;

  @ManyToOne(() => Supplier, supplier => supplier.iten)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Iten;
