import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { IClient } from 'src/types/Client';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<IClient[]> {
    return this.clientsRepository.find();
  }

  findOne(id: number): Promise<IClient> {
    return this.clientsRepository.findOneBy({ id });
  }

  create(client: Omit<IClient, 'id'>): Promise<IClient> {
    const data = this.clientsRepository.create(client);
    return this.clientsRepository.save(data);
  }

  async delete(id: number) {
    await this.clientsRepository.delete(id);
    return this.clientsRepository.find();
  }

  async update(id: number, client: Partial<IClient>): Promise<IClient> {
    await this.clientsRepository.update(id, client);
    const updatedClient = this.clientsRepository.findOneBy({ id });
    if (!updatedClient) {
      throw new Error(`Client with id ${id} not found`);
    }
    return updatedClient;
  }
}
