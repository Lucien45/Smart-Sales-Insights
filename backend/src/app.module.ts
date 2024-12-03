import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProduitsModule } from './produits/produits.module';
import { ClientsModule } from './clients/clients.module';
import { VentesModule } from './ventes/ventes.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    UsersModule,
    ProduitsModule,
    ClientsModule,
    VentesModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
<<<<<<< HEAD
      username: 'postgres',
      password: 'azerty',
=======
      username: 'toavina',
      password: '123456',
>>>>>>> origin/feat/dashboard
      database: 'smart_sales',
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
