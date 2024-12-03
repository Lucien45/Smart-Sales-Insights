import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FormDataUser } from 'src/types/Utilisateur';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: {
    username: string;
    mail: string;
    password: string;
    type: 'user' | 'superuser';
  }) {
    const { username, mail, password, type } = data;

    const existingUser = await this.utilisateurRepository.findOne({
      where: { mail },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.utilisateurRepository.create({
      username,
      mail,
      password: hashedPassword,
      type,
      date_creation: new Date(),
    });

    return this.utilisateurRepository.save(newUser);
  }

  async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;

    const user = await this.utilisateurRepository.findOne({
      where: [{ mail: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new UnauthorizedException(
        'Aucun utilisateur trouvé avec cet identifiant.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }
    return user;
  }

  async getProfileUser(userId: number) {
    const user = await this.utilisateurRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException('User not found.');
    }
    return user;
  }

  async getAllUser() {
    const user = await this.utilisateurRepository.find();
    return user;
  }

  async updateUser(id: number, data: Partial<FormDataUser>) {
    const user = await this.utilisateurRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const updatedUser = Object.assign(user, data);
    await this.utilisateurRepository.save(updatedUser);

    return this.utilisateurRepository.findOneBy({ id });
  }

  async deleteUser(id: number) {
    await this.utilisateurRepository.delete(id);
    return this.utilisateurRepository.find();
  }

  async logout() {
    return { message: 'logout succes' };
  }
}
