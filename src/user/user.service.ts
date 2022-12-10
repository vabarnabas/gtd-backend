import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findSpecific(id: string): Promise<User> {
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [{ id: { equals: id } }, { email: { equals: id } }],
      },
    });

    if (users.length === 0) throw new ForbiddenException('Access denied.');

    return users[0];
  }

  async create(input: User) {
    if (!input.displayName || !input.email || !input.password) {
      throw new ForbiddenException('Access denied.');
    }

    const salt = await genSalt();
    input.password = await hash(input.password, salt);

    return await this.prismaService.user.create({
      data: input,
    });
  }

  async update(input: User, id: string) {
    if (input?.password) {
      const salt = await genSalt();
      input.password = await hash(input.password, salt);
    }

    const users = await this.prismaService.user.findMany({
      where: {
        OR: [{ id: { equals: id } }, { email: { equals: id } }],
      },
    });

    if (users.length === 0) throw new ForbiddenException('Access denied.');

    return await this.prismaService.user.update({
      where: { id: users[0].id },
      data: input,
    });
  }

  async remove(id: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [{ id: { equals: id } }, { email: { equals: id } }],
      },
    });

    if (users.length === 0) throw new ForbiddenException('Access denied.');

    return await this.prismaService.user.delete({
      where: { id: users[0].id },
    });
  }
}
