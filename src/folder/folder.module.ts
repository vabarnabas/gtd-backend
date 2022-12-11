import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';

@Module({
  imports: [PrismaModule],
  providers: [FolderService],
  controllers: [FolderController],
})
export class FolderModule {}
