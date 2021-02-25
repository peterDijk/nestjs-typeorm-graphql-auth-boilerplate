import { Controller, Get, Post } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health check')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiResponse({ status: 200, description: 'Perform API health check' })
  @Get()
  getHealth() {
    return this.healthService.get();
  }

  @ApiResponse({
    status: 201,
    description: 'Store health check - will be authorized path',
  })
  @Post()
  createHealth() {
    return this.healthService.create();
  }
}
