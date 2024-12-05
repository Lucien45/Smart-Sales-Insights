/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find({ relations: ['idUtilisateur'] });
  }

  // create(client: Client): Promise<Client> {
  //   return this.clientsRepository.save(client);
  // }
  create(createClientDto: CreateClientDto) {
    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }

  // async update(id: number, Client: Partial<Client>): Promise<Client[]> {
  //   await this.clientsRepository.update(id, Client);
  //   return this.clientsRepository.find();
  // }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientsRepository.update(id, updateClientDto);
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id }, relations: ['idUtilisateur'] });
    return client;
  }
}
