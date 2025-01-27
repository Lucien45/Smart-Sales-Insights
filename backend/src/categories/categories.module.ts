/* eslint-disable prettier/prettier */
// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categorie } from './entities/categorie.entity';
import { ProduitsModule } from '../produits/produits.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorie]),
    ProduitsModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
