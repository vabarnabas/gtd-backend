import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Folder } from '@prisma/client';

@Injectable()
export class FolderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Folder[]> {
    return this.prismaService.folder.findMany();
  }

  async findSpecific(id: string): Promise<Folder> {
    const folder = await this.prismaService.folder.findUnique({
      where: {
        id,
      },
    });

    if (!folder) throw new ForbiddenException('Access denied.');

    return folder;
  }

  async findMy(id: string): Promise<Folder[]> {
    return this.prismaService.folder.findMany({ where: { userId: id } });
  }

  async create(input: Folder) {
    if (!input.title) {
      throw new ForbiddenException('Access denied.');
    }

    return await this.prismaService.folder.create({
      data: input,
    });
  }

  async update(input: Folder, id: string) {
    const folder = await this.prismaService.folder.findUnique({
      where: {
        id,
      },
    });

    if (!folder) throw new ForbiddenException('Access denied.');

    return await this.prismaService.folder.update({
      where: { id },
      data: input,
    });
  }

  async remove(id: string) {
    const folder = await this.prismaService.folder.findUnique({
      where: {
        id,
      },
    });

    if (!folder) throw new ForbiddenException('Access denied.');

    return await this.prismaService.folder.delete({
      where: { id: folder.id },
    });
  }
}
