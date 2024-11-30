import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { Produit } from './entities/produit.entity';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}
  @Get('stats')
  getProduitsAchetesParCategorie() {
    return this.produitsService.getProduitsAchetesParCategorie();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Produit> {
    return this.produitsService.findOne(+id);
  }

  @Get()
  findAll(): Promise<Produit[]> {
    return this.produitsService.findAll();
  }

  @Post()
  create(@Body() produit: Produit): Promise<Produit> {
    return this.produitsService.create(produit);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() produit: Partial<Produit>,
  ): Promise<Produit[]> {
    return this.produitsService.update(id, produit);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.produitsService.remove(id);
  }
}
