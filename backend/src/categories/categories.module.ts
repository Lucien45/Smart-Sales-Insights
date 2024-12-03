// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categorie } from './entities/categorie.entity';
import { ProduitsModule } from '../produits/produits.module'; // Pour la relation avec les produits

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorie]),
    // On importe ProduitsModule si on a besoin d'accéder au service des produits
    ProduitsModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  // On exporte le service pour qu'il soit accessible par d'autres modules
  exports: [CategoriesService],
})
export class CategoriesModule {}
