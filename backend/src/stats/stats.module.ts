/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Vente } from 'src/ventes/entities/vente.entity';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vente, Client]), // Injecte les entités nécessaires
  ],
  controllers: [StatsController], // Expose le contrôleur pour les endpoints
  providers: [StatsService], // Fournit le service pour la logique métier
})
export class StatsModule {}
