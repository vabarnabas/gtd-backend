import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Folder } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async finAll(): Promise<Folder[]> {
    return await this.folderService.findAll();
  }

  @Get(':id')
  async findSpecific(@Param('id') id: string): Promise<Folder> {
    return await this.folderService.findSpecific(id);
  }

  @Post('my')
  async findMy(@GetCurrentUser('id') id: string): Promise<Folder[]> {
    return await this.folderService.findMy(id);
  }

  @Post('connect/:id/:userId')
  async connect(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Folder> {
    return await this.folderService.connect(id, userId);
  }

  @Post('disconnect/:id/:userId')
  async disconnect(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Folder> {
    return await this.folderService.disconnect(id, userId);
  }

  @Post()
  async create(@Body() input: Folder) {
    return await this.folderService.create(input);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() input: Folder) {
    return await this.folderService.update(input, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.folderService.remove(id);
  }
}
