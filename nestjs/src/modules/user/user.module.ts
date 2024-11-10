import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ShoppingCardEntity } from '../shopping-card/entites/shoping-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShoppingCardEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
