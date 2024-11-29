import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    JwtModule.register({
      global: true,
      secret: 'd42f2809715d96228dada6adbaf332396add73aa29bb0828796d78e9e501dd5a1178dca63f61a51ed605b7170a06be79fc2b387ede34e5b37ab7952433b0b413',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
