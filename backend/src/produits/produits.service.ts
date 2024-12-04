import { Produit } from './entities/produit.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private produitsRepository: Repository<Produit>,
  ) {}

  findAll(): Promise<Produit[]> {
    return this.produitsRepository.find();
  }

  async getProduitsAchetesParCategorie() {
    return this.produitsRepository
      .createQueryBuilder('produit')
      .select('categorie.nom', 'categorie')
      .addSelect('CAST(SUM(ventes.nombre) AS DECIMAL)', 'quantite_totale')
      .innerJoin('produit.idCategorie', 'categorie')
      .innerJoin('ventes', 'ventes', 'ventes.idProduitId = produit.id')
      .groupBy('categorie.nom')
      .orderBy('quantite_totale', 'DESC')
      .getRawMany();
  }

  create(produit: Produit): Promise<Produit> {
    return this.produitsRepository.save(produit);
  }

  async update(id: number, produit: Partial<Produit>): Promise<Produit[]> {
    await this.produitsRepository.update(id, produit);
    return this.produitsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.produitsRepository.delete(id);
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.produitsRepository.findOneBy({ id });
    return produit;
  }
}
