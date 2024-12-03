import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Exclude } from 'class-transformer';
import { AccessTokenEntity } from '../../auth/entities/access-token.entity';
import { ShoppingCardEntity } from '../../shopping-card/entities/shoping-card.entity';
import { UserRoleEnum } from '../enums/user-role.enum';

@Entity({ name: 'system_user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'nick_name', nullable: true })
  nickName: string;

  @Column({ name: 'status', nullable: false })
  status: number;

  @Column({
    name: 'role',
    nullable: false,
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @OneToMany(() => AccessTokenEntity, (accessToken) => accessToken.user)
  accessTokens!: AccessTokenEntity[];

  @OneToOne(() => ShoppingCardEntity, (card) => card.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shoppingCard: ShoppingCardEntity;
}
