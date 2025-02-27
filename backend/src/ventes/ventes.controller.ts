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
import { Vente } from './entities/vente.entity';
import { VentesService } from './ventes.service';
import { CreateVenteDto, UpdateVenteDto } from './dto/vente.dto';

@Controller('ventes')
export class VentesController {
  constructor(private readonly ventesService: VentesService) {}

  @Get('user/:userId/categorie/:categorieId')
  async getVentesUserParCategorie(
    @Param('userId') userId: number,
    @Param('categorieId') categorieId: number,
  ): Promise<Vente[]> {
    return this.ventesService.getVentesUserParCategorie(userId, categorieId);
  }

  @Get('user/:userId')
  getVentesByUserId(@Param('userId') userId: number) {
    return this.ventesService.getVentesByUserId(userId);
  }

  @Get(':id')
  findOneById(@Param('id') id: number){
    return this.ventesService.findOne(id);
  }

  @Get()
  findAll(){
    return this.ventesService.findAll();
  }

  @Post()
  create(@Body() createVenteDto: CreateVenteDto) {
    return this.ventesService.create(createVenteDto);
  }
  // create(@Body() vente: Vente): Promise<Vente> {
  //   return this.ventesService.create(vente);
  // }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVenteDto: UpdateVenteDto) {
    return this.ventesService.update(id, updateVenteDto);
  }
  // update(
  //   @Param('id') id: number,
  //   @Body() vente: Partial<Vente>,
  // ): Promise<Vente[]> {
  //   return this.ventesService.update(id, vente);
  // }

  @Delete(':id')
  remove(@Param('id') id: number){
    return this.ventesService.remove(id);
  }

  @Get('categories/:id')
  getVentesByCategorie(@Param('id') id: number): Promise<Vente[]> {
    return this.ventesService.getVentesByIdCategorie(id);
  }
}
