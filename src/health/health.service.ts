import { Injectable } from '@nestjs/common';
import { HealthCheck } from './health.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthCheck)
    private healthRepository: Repository<HealthCheck>,
  ) {}

  get(): Record<string, unknown> {
    return {
      message: 'ok',
    };
  }

  create(): Promise<HealthCheck> {
    return this.healthRepository.save({ message: 'health check ok' });
  }

  findAll(): Promise<HealthCheck[]> {
    return this.healthRepository.find();
  }

  findOne(id: string): Promise<HealthCheck> {
    return this.healthRepository.findOne(id);
  }
}
