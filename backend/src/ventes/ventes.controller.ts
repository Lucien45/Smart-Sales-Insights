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
}
