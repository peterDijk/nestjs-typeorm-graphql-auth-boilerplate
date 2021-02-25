import { Injectable } from '@nestjs/common';
import { HealthCheck as HealthCheckModel } from './health.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthCheckModel)
    private healthRepository: Repository<HealthCheckModel>,
  ) {}

  create(): Promise<HealthCheckModel> {
    return this.healthRepository.save({ message: 'health check ok' });
  }

  findAll(): Promise<HealthCheckModel[]> {
    return this.healthRepository.find();
  }

  findOne(id: string): Promise<HealthCheckModel> {
    return this.healthRepository.findOne(id);
  }
}
