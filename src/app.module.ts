import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from '../ormconfig';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class AppModule {}
