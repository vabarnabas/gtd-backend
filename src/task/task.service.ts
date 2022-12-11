import { Task } from './../../node_modules/.prisma/client/index.d';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async findSpecific(id: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new ForbiddenException('Access denied.');

    return task;
  }

  async findMy(id: string): Promise<Task[]> {
    return this.prismaService.task.findMany({ where: { userId: id } });
  }

  async create(input: Task) {
    if (!input.title || !input.description || !input.status) {
      throw new ForbiddenException('Access denied.');
    }

    return await this.prismaService.task.create({
      data: input,
    });
  }

  async update(input: Task, id: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new ForbiddenException('Access denied.');

    return await this.prismaService.task.update({
      where: { id },
      data: input,
    });
  }

  async remove(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new ForbiddenException('Access denied.');

    return await this.prismaService.task.delete({
      where: { id: task.id },
    });
  }
}
