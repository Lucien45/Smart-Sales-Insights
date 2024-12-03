import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  create(client: Client): Promise<Client> {
    return this.clientsRepository.save(client);
  }

  async update(id: number, Client: Partial<Client>): Promise<Client[]> {
    await this.clientsRepository.update(id, Client);
    return this.clientsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOneBy({ id });
    return client;
  }
}
