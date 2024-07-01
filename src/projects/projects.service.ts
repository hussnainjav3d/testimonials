import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProjectDto: CreateProjectDto) {
    return this.databaseService.project.create({ data: createProjectDto });
  }

  async findAll(page = 1, limit = 10): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const [projects, total] = await this.databaseService.$transaction([
        this.databaseService.project.findMany({
          skip,
          take: +limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.databaseService.project.count(),
      ]);
      return {
        data: {
          projects,
          totalRecords: total,
          currentPage: +page,
          currentPageRecord: projects.length,
        },
        hasError: false,
        message: 'SUCCESS: Operation completed successfully',
      };
    } catch (error) {
      console.log(`error-code`, error);
      throw new NotImplementedException(error.message);
    }
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

  async update(id: string, updateProjectDto: UpdateProjectDto) {
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
