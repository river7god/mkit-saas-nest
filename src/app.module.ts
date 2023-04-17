import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './admin/tenant/tenant.module';
import { UserModule } from './admin/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import loadConfig from './system/config/configurations';
import { AuthModule } from './system/auth/auth.module';

const DOCKER_ENV = process.env.DOCKER_ENV;

const systemModules = [
  ConfigModule,
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: [DOCKER_ENV ? '.docker.env' : '.env'],
  }),  
];

const adminModules = [TenantModule, UserModule, AuthModule];

@Module({
  imports: [...systemModules, ...adminModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
