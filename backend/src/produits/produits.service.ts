import { Produit } from './entities/produit.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private clientsRepository: Repository<Produit>,
  ) {}

  findAll(): Promise<Produit[]> {
    return this.clientsRepository.find();
  }

  create(produit: Produit): Promise<Produit> {
    return this.clientsRepository.save(produit);
  }

  async update(id: number, produit: Partial<Produit>): Promise<Todo[]> {
    await this.clientsRepository.update(id, produit);
    return this.clientsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.clientsRepository.findOneBy({ id });
    return produit;
  }
}
