import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: Prisma.ProjectCreateInput) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    if (isNaN(limit) || limit < 1) {
      page = 10;
    }

    return this.projectsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
  @Get()
  listProjects() {
    return `this.projectsService.findAll()`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: Prisma.ProjectUpdateInput,
  ) {
    try {
      return this.projectsService.update(id, updateProjectDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.log(`error`, error);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
