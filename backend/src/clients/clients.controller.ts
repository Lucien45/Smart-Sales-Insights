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

@Controller('clients')
export class ClientsController {
  constructor(private readonly ClientService: ClientsService) {}

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Client> {
    return this.ClientService.findOne(+id);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.ClientService.findAll();
  }

  @Post()
  create(@Body() client: Client): Promise<Client> {
    return this.ClientService.create(client);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() client: Partial<Client>,
  ): Promise<Client[]> {
    return this.ClientService.update(id, client);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ClientService.remove(id);
  }
}
