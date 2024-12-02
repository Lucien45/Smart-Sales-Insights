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
  findOneById(@Param('id') id: string): Promise<Vente> {
    return this.ventesService.findOne(+id);
  }

  @Get()
  findAll(): Promise<Vente[]> {
    return this.ventesService.findAll();
  }

  @Post()
  create(@Body() vente: Vente): Promise<Vente> {
    return this.ventesService.create(vente);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() vente: Partial<Vente>,
  ): Promise<Vente[]> {
    return this.ventesService.update(id, vente);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ventesService.remove(id);
  }

  @Get('categories/:id')
  getVentesByCategorie(@Param('id') id: number): Promise<Vente[]> {
    return this.ventesService.getVentesByIdCategorie(id);
  }
}
