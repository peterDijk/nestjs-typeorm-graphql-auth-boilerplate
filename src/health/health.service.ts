import { Injectable } from '@nestjs/common';
import { HealthCheck } from './health.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/users/user.dto';

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

  create(user: UserDto): Promise<HealthCheck> {
    return this.healthRepository.save({ message: 'health check ok', user });
  }

  findAll(): Promise<HealthCheck[]> {
    return this.healthRepository.find({ relations: ['user'] });
  }

  findOne(id: string): Promise<HealthCheck> {
    return this.healthRepository.findOne(id);
  }
}
