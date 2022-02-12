import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

/* owning side of user-address rel, keeps a ref to user_id */
@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  }) // if delete user, then connected address also get deleted.
  @JoinColumn()
  user: User;
}
