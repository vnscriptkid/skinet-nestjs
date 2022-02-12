import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Address } from './address.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;
}
