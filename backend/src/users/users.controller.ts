import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth.guard';
import { FormDataUser } from 'src/types/Utilisateur';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

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

  @Put('update/:id')
  update(@Param('id') id: number, @Body() data: Partial<FormDataUser>) {
    return this.authService.updateUser(id, data);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Partial<FormDataUser>,
  ) {
    return this.authService.updateUser(+id, data);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
