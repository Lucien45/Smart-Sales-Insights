/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike } from 'typeorm';
import { Categorie } from './entities/categorie.entity';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}

  // Créer une nouvelle catégorie
  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const categorie = this.categoriesRepository.create(createCategorieDto);
    return await this.categoriesRepository.save(categorie);
  }

  // Récupérer toutes les catégories
  async findAll(options?: FindManyOptions<Categorie>): Promise<Categorie[]> {
    return await this.categoriesRepository.find(
      options || {
        relations: ['produits'],
        order: {
          nom: 'ASC',
        },
      },
    );
  }

  // Récupérer une catégorie par son ID
  async findOne(id: number): Promise<Categorie> {
    return await this.categoriesRepository.findOne({
      where: { id },
      relations: ['produits'],
    });
  }

  // Mettre à jour une catégorie
  async update(
    id: number,
    updateCategorieDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    await this.categoriesRepository.update(id, updateCategorieDto);
    return this.findOne(id);
  }

  // Supprimer une catégorie
  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }

  // Récupérer les statistiques des catégories
  async getStats(): Promise<any[]> {
    return await this.categoriesRepository
      .createQueryBuilder('categorie')
      .leftJoinAndSelect('categorie.produits', 'produit')
      .select([
        'categorie.id',
        'categorie.nom',
        'COUNT(produit.id) as nombreProduits',
        'SUM(produit.stock) as stockTotal',
        'AVG(produit.prix) as prixMoyen',
      ])
      .groupBy('categorie.id')
      .getRawMany();
  }

  // Rechercher des catégories par nom
  async searchByName(nom: string): Promise<Categorie[]> {
    return await this.categoriesRepository.find({
      where: {
        nom: ILike(`%${nom}%`),
      },
      relations: ['produits'],
    });
  }

  // Récupérer les catégories avec le nombre de produits
  async getCategoriesWithProductCount(): Promise<any[]> {
    return await this.categoriesRepository
      .createQueryBuilder('categorie')
      .leftJoinAndSelect('categorie.produits', 'produit')
      .select([
        'categorie.id',
        'categorie.nom',
        'COUNT(produit.id) as productCount',
      ])
      .groupBy('categorie.id')
      .orderBy('categorie.nom', 'ASC')
      .getRawMany();
  }
}
