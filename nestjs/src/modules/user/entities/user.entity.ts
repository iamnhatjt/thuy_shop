import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Exclude } from 'class-transformer';
import { AccessTokenEntity } from '../../auth/entities/access-token.entity';

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

  @OneToMany(() => AccessTokenEntity, (accessToken) => accessToken.user)
  accessTokens!: AccessTokenEntity[];
}
