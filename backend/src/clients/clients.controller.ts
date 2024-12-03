import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { IClient } from 'src/types/Client';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<IClient[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IClient> {
    return this.clientsService.findOne(+id);
  }

  @Post()
  create(@Body() todo: Omit<IClient, 'id'>): Promise<IClient> {
    return this.clientsService.create(todo);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IClient[]> {
    return this.clientsService.delete(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() todo: Partial<IClient>,
  ): Promise<IClient> {
    return this.clientsService.update(+id, todo);
  }
}
