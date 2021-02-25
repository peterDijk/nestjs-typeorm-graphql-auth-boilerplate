import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from '../ormconfig';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, TypeOrmModule.forRoot(TypeOrmConfig)],
  providers: [AppService],
})
export class AppModule {}
