/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  providers: [ProduitsService],
  controllers: [ProduitsController],
})
export class ProduitsModule {}
