import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vente } from './entities/vente.entity';
import { Repository } from 'typeorm';
@Injectable()
export class VentesService {
  constructor(
    @InjectRepository(Vente)
    private todosRepository: Repository<Vente>,
  ) {}

  findAll(): Promise<Vente[]> {
    return this.todosRepository.find();
  }

  create(vente: Vente): Promise<Vente> {
    return this.todosRepository.save(vente);
  }

  async update(id: number, vente: Partial<Vente>): Promise<Vente[]> {
    await this.todosRepository.update(id, vente);
    return this.todosRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }

  async findOne(id: number): Promise<Vente> {
    const vente = await this.todosRepository.findOneBy({ id });
    return vente;
  }
}
