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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: user.id, username: user.username, type: user.type };
    const token = this.jwtService.sign(payload);

    return { token };
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

  async logout() {
    return { message: 'logout succes' };
  }

  async findAll() {
    return this.utilisateurRepository.find({
      select: ['id', 'username'], // Récupérer seulement les champs nécessaires
    });
  }
}
