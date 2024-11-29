import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username, mail, password, type } = body;
    return this.authService.register({ username, mail, password, type });
  }

  @Post('login')
  async login(@Body() body: any) {
    const { mail, password } = body;
    return this.authService.login({ identifier: mail, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfileUser(@Req() req: any) {
    return this.authService.getProfileUser(req.user.id);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
