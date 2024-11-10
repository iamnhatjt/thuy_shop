import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm/database.config';
import { AppConfig, MinIoConfig, SecurityConfig } from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { StorageModule } from './modules/storage/storage.module';
import { BannerModule } from './modules/banner/banner.module';
import { ShoppingCardModule } from './modules/shopping-card/shopping-card.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [AppConfig, SecurityConfig, MinIoConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    StorageModule,
    BannerModule,
    ShoppingCardModule,
    ProductModule,
  ],
})
export class AppModule {}
