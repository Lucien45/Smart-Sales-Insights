import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categorie } from './entities/categorie.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll({
      relations: ['produits'],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Categorie> {
    return this.categoriesService.findOne(id);
  }

  
}
