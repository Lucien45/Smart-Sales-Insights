/* eslint-disable prettier/prettier */
import { Produit } from './entities/produit.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduitDto, UpdateProduitDto } from './dto/produit.dto';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private produitsRepository: Repository<Produit>,
  ) {}

  findAll(){
    return this.produitsRepository.find({ relations: ['idCategorie'] });
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

  create(createProduitDto: CreateProduitDto) {
    const produit = this.produitsRepository.create(createProduitDto);
    return this.produitsRepository.save(produit);
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    return this.produitsRepository.update(id, updateProduitDto);
  }

  async remove(id: number): Promise<void> {
    await this.produitsRepository.delete(id);
  }

  async findOne(id: number){
    const produit = await this.produitsRepository.findOne({ where: { id }, relations: ['idCategorie'] });
    return produit;
  }
}
