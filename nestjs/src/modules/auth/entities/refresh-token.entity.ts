import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessTokenEntity } from './access-token.entity';

@Entity('user_refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500 })
  value!: string;

  @Column()
  expired_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => AccessTokenEntity, (accessToken) => accessToken.refreshToken)
  accessToken!: AccessTokenEntity;
}
