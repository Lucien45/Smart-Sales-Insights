/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { VentesController } from './ventes.controller';
import { Vente } from './entities/vente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from 'src/produits/entities/produit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vente, Produit])],
  providers: [VentesService],
  controllers: [VentesController],
})
export class VentesModule {}
