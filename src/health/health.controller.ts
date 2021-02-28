import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  createHealth(@Request() req: any) {
    console.log({ headers: req.headers });
    return this.healthService.create();
  }
}
