import { Categorie } from 'src/categories/entities/categorie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vente } from './entities/vente.entity';
import { Repository } from 'typeorm';
@Injectable()
export class VentesService {
  constructor(
    @InjectRepository(Vente)
    private ventesRepository: Repository<Vente>,
  ) {}

  findAll(): Promise<Vente[]> {
    return this.ventesRepository.find();
  }

  create(vente: Vente): Promise<Vente> {
    return this.ventesRepository.save(vente);
  }

  async update(id: number, vente: Partial<Vente>): Promise<Vente[]> {
    await this.ventesRepository.update(id, vente);
    return this.ventesRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.ventesRepository.delete(id);
  }

  async findOne(id: number): Promise<Vente> {
    const vente = await this.ventesRepository.findOneBy({ id });
    return vente;
  }

  async getVentesByUserId(userId: number): Promise<any> {
    const ventes = await this.ventesRepository
      .createQueryBuilder('vente')
      .leftJoinAndSelect('vente.idClient', 'client')
      .where('client.id = :userId', { userId })
      .orderBy('vente.date_achat', 'ASC')
      .getMany();

    // Structurez les données pour l'évolution des ventes
    const salesData = ventes.map((vente) => ({
      date: vente.date_achat.toISOString().split('T')[0], // Formater la date
      nombre: vente.nombre,
    }));

    return salesData;
  }

  async getVentesByIdCategorie(categorieID: number): Promise<Vente[]> {
    return this.ventesRepository
      .createQueryBuilder('vente')
      .innerJoinAndSelect('vente.idProduit', 'produit')
      .where('produit.idCategorie = :categorieID', { categorieID })
      .getMany();
  }

  async getVentesUserParCategorie(
    userId: number,
    categorieId: number,
  ): Promise<Vente[]> {
    return this.ventesRepository
      .createQueryBuilder('vente')
      .innerJoinAndSelect('vente.idProduit', 'produit')
      .innerJoinAndSelect('vente.idClient', 'client')
      .where('client.id = :userId', { userId })
      .andWhere('produit.idCategorie = :categorieId', { categorieId })
      .getMany();
  }
}
