import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { UpdateOrgDto } from './dto/update-org.dto';

@Injectable()
export class OrgsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createOrgDto: CreateOrgDto) {
    return this.databaseService.organization.create({
      data: createOrgDto,
    });
  }

  async findAll() {
    try {
      return this.databaseService.organization.findMany();
    } catch (error) {
      console.log(`Got Error`, error);
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const org = await this.databaseService.organization.findUnique({
      where: { id },
    });
    if (!org) {
      throw new NotFoundException(`Org with ${id} Not Found`);
    }

    return org;
  }

  async update(id: string, updateOrgDto: UpdateOrgDto) {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException(`Org with ${id} Not Found`);
    }
    return this.databaseService.organization.update({
      where: { id },
      data: updateOrgDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.organization.delete({
      where: { id },
    });
  }
}
