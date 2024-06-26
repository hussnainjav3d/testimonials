import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.databaseService.project.create({ data: createProjectDto });
  }

  async findAll() {
    return this.databaseService.project.findMany();
  }

  async findOne(id: string) {
    const project = await this.databaseService.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ${id} Not Found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: Prisma.ProjectUpdateInput) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ${id} Not Found`);
    }

    return this.databaseService.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
