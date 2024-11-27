import { Module } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { VentesController } from './ventes.controller';

@Module({
  providers: [VentesService],
  controllers: [VentesController]
})
export class VentesModule {}
