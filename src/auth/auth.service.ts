import { ChangePasswordDTO } from './dto/auth.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getToken(id: string, identifier: string, displayName: string) {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          identifier,
          userName: displayName,
        },
        { secret: 'at-secret', expiresIn: 60 * 60 },
      ),
    ]);

    return {
      access_token: at,
    };
  }

  async signInLocal(dto: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.identifier },
    });
    if (!user) throw new ForbiddenException('Access denied.');

    const passwordMatches = await compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access denied.');

    return await this.getToken(user.id, user.email, user.displayName);
  }

  async registerLocal(dto: RegisterDTO) {
    const salt = await genSalt();
    dto.password = await hash(dto.password, salt);

    const user = await this.prismaService.user.create({ data: dto });

    await this.prismaService.folder.create({
      data: {
        title: 'General',
        userId: user.id,
      },
    });

    return user;
  }

  async changePassword(dto: ChangePasswordDTO, id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new ForbiddenException('Access denied.');

    if (!compare(dto.oldPassword, user.password))
      throw new ForbiddenException('Access denied.');

    const salt = await genSalt();
    dto.password = await hash(dto.password, salt);

    return await this.prismaService.user.update({
      where: { id },
      data: { password: dto.password },
    });
  }
}
