import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrgsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createOrgDto: Prisma.OrganizationCreateInput) {
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

  async update(id: string, updateOrgDto: Prisma.OrganizationUpdateInput) {
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
