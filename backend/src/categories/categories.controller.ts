/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categorie } from './entities/categorie.entity';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

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

  @Post()
  create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categoriesService.create(createCategorieDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategorieDto: UpdateCategorieDto) {
    return this.categoriesService.update(id, updateCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }

}
