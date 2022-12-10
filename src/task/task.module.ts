import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [PrismaModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
