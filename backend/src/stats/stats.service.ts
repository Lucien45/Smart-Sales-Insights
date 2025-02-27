/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vente } from 'src/ventes/entities/vente.entity';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Vente)
    private venteRepository: Repository<Vente>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async getVentesParClient(): Promise<{ client: string; ventes: number }[]> {
    const ventes = await this.venteRepository
      .createQueryBuilder('vente')
      .select('vente.idClient', 'clientId')
      .addSelect('COUNT(vente.id)', 'totalVentes')
      .groupBy('vente.idClient')
      .getRawMany();

    const result = [];
    for (const vente of ventes) {
      const client = await this.clientRepository.findOne({
        where: { id: vente.clientId },
      });
      result.push({
        client: `${client.nom} ${client.prenom}`,
        ventes: parseInt(vente.totalVentes, 10),
      });
    }
    return result;
  }
}
