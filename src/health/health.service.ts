import { Injectable } from '@nestjs/common';
import { HealthModel } from './health.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthModel)
    private healthRepository: Repository<HealthModel>,
  ) {}

  create(): Promise<HealthModel> {
    return this.healthRepository.save({ message: 'health check ok' });
  }

  findAll(): Promise<HealthModel[]> {
    return this.healthRepository.find();
  }

  findOne(id: string): Promise<HealthModel> {
    return this.healthRepository.findOne(id);
  }
}
