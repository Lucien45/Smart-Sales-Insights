import { Module } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { VentesController } from './ventes.controller';
import { Vente } from './entities/vente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vente])],
  providers: [VentesService],
  controllers: [VentesController],
})
export class VentesModule {}
