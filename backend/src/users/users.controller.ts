/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth.guard';
import { Utilisateur } from './entities/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormDataUser } from 'src/types/Utilisateur';
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: UsersService,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username, mail, password, type } = body;

    // Validation manuelle
    if (!username || typeof username !== 'string') {
      throw new BadRequestException(
        'Le champ "username" est requis et doit être une chaîne.',
      );
    }
    if (!mail || typeof mail !== 'string') {
      throw new BadRequestException(
        'Le champ "mail" est requis et doit être une chaîne.',
      );
    }
    if (!password || typeof password !== 'string') {
      throw new BadRequestException(
        'Le champ "password" est requis et doit être une chaîne.',
      );
    }
    return this.authService.register({ username, mail, password, type });
  }

  @Post('login')
  async login(@Body() body: any) {
    const { identification, password } = body;

    // Validation manuelle
    if (!identification || typeof identification !== 'string') {
      throw new BadRequestException(
        'Le champ "identification" est requis et doit être une chaîne.',
      );
    }
    if (!password || typeof password !== 'string') {
      throw new BadRequestException(
        'Le champ "password" est requis et doit être une chaîne.',
      );
    }

    return this.authService.login({ identifier: identification, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfileUser(@Req() req: any) {
    const userId = req.user.sub; // Le champ "sub" contient l'ID utilisateur dans le JWT

    if (!userId) {
      throw new BadRequestException(
        'Impossible de récupérer le profil utilisateur.',
      );
    }
    return this.authService.getProfileUser(userId);
  }

  @Get('list-user')
  async getAllUser() {
    return this.authService.getAllUser();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException(
        'Impossible de récupérer le profil utilisateur.',
      );
    }
    return this.authService.getUserById(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() data: Partial<FormDataUser>) {
    return this.authService.updateUser(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.authService.removeUser(+id);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Get()
  async findAll() {
    return this.authService.getAllUser();
  }
}
