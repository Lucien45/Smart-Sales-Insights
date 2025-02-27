/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('ventes-par-client')
  async getVentesParClient() {
    return this.statsService.getVentesParClient();
  }
}
