import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) return null;

    let isPasswordValid = false;

    // Verifica si coincide como hash bcrypt
    try {
      isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    } catch {
      isPasswordValid = false;
    }

    // Si no es hash, verifica si coincide en texto plano
    if (!isPasswordValid && user.password === foundUser.password) {
      isPasswordValid = true;
    }

    if (isPasswordValid) {
      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      });
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}