/* eslint-disable prettier/prettier */
import { Client } from './entities/client.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly ClientService: ClientsService) {}

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Client> {
    return this.ClientService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.ClientService.findAll();
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.ClientService.create(createClientDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.ClientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number){
    return this.ClientService.remove(id);
  }
}
