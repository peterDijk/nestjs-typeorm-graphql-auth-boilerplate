import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/user.dto';
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

  @ApiResponse({ status: 200, description: 'List all health check records' })
  @Get('all')
  @UseGuards(AuthGuard())
  async getAllHealth() {
    return await this.healthService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Store health check - Authorized',
  })
  @Post()
  @UseGuards(AuthGuard())
  createHealth(@Request() req: any) {
    const user = req.user as UserDto;

    return this.healthService.create(user);
  }
}
