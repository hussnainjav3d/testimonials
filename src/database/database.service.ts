import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to the database successfully');
    } catch (error) {
      this.logger.error(`database is not connected with error: ${error}`);
      process.exit(1);
    }
  }

  // async onModuleDestroy() {
  //   await this.$disconnect();
  //   console.log(`database is disconnected`);
  // }
}
