import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetCurrentUser } from 'src/common/decorators';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async finAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findSpecific(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findSpecific(id);
  }

  @Post('my')
  async findMy(@GetCurrentUser('id') id: string): Promise<Task[]> {
    return await this.taskService.findMy(id);
  }

  @Post()
  async create(@Body() input: Task) {
    return await this.taskService.create(input);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() input: Task) {
    return await this.taskService.update(input, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
