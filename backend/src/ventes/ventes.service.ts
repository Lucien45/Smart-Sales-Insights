/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vente } from './entities/vente.entity';
import { Repository } from 'typeorm';
import { CreateVenteDto, UpdateVenteDto } from './dto/vente.dto';
import { Produit } from 'src/produits/entities/produit.entity';
@Injectable()
export class VentesService {
  constructor(
    @InjectRepository(Vente)
    private ventesRepository: Repository<Vente>,
    @InjectRepository(Produit)
    private produitsRepository: Repository<Produit>,
  ) {}

  findAll(){
    return this.ventesRepository.find({ relations: ['idClient', 'idProduit'] });
  }

  async create(createVenteDto: CreateVenteDto) {
    const { idProduit, nombre } = createVenteDto;
    // Vérifier si le produit existe
    const produit = await this.produitsRepository.findOne({
      where: { id: +idProduit },
    });

    if (!produit) {
      throw new BadRequestException('Le produit spécifié est introuvable.');
    }

    // Vérifier si le stock est suffisant
    if (produit.stock < nombre) {
      throw new BadRequestException(
        `Stock insuffisant pour le produit ${produit.nom}. Quantité en stock: ${produit.stock}`,
      );
    }

    // Réduire le stock du produit
    produit.stock -= nombre;
    await this.produitsRepository.save(produit);

    const vente = this.ventesRepository.create(createVenteDto);
    return this.ventesRepository.save(vente);
  }

  // async update(id: number, vente: Partial<Vente>): Promise<Vente[]> {
  //   await this.ventesRepository.update(id, vente);
  //   return this.ventesRepository.find();
  // }
  async update(id: number, updateVenteDto: UpdateVenteDto) {
    // Récupérez la vente actuelle
    const existingVente = await this.ventesRepository.findOne({ where: { id }, relations: ['idProduit'],});

    if (!existingVente) {
      throw new Error('Vente introuvable');
    }

    // Calculez la différence de quantité
    const oldQuantity = existingVente.nombre;
    const newQuantity = updateVenteDto.nombre;
    const quantityDifference = newQuantity - oldQuantity;

    // Récupérez le produit lié
    const produit = existingVente.idProduit;

    if (!produit) {
      throw new Error('Produit introuvable pour la vente');
    }

    produit.stock -= quantityDifference;
    if (produit.stock < 0) {
      throw new Error('Stock insuffisant pour cette mise à jour');
    }

    await this.produitsRepository.save(produit);

    return this.ventesRepository.update(id, updateVenteDto);
  }

  async remove(id: number){
    await this.ventesRepository.delete(id);
  }

  async findOne(id: number){
    const vente = await this.ventesRepository.findOne({ where: { id }, relations: ['idClient', 'idProduit'] });
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
