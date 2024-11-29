import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';

@Module({
  providers: [ProduitsService],
  controllers: [ProduitsController],
})
export class ProduitsModule {}
