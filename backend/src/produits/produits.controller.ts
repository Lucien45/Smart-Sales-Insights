/* eslint-disable prettier/prettier */
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
import { CreateProduitDto, UpdateProduitDto } from './dto/produit.dto';

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
  findAll(){
    return this.produitsService.findAll();
  }

  @Post()
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitsService.create(createProduitDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number){
    return this.produitsService.remove(id);
  }
}
