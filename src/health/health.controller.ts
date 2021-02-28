import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  createHealth() {
    return this.healthService.create();
  }
}
