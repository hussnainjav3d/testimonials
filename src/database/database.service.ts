import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log(`database is connected`);
    } catch (error) {
      console.log(`database is not connected with error: ${error}`);
    }
  }

  // async onModuleDestroy() {
  //   await this.$disconnect();
  //   console.log(`database is disconnected`);
  // }
}
