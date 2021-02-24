import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: 200, description: 'Perform API health check' })
  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }
}
