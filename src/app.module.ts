import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { OrgsModule } from './orgs/orgs.module';

@Module({
  imports: [UsersModule, DatabaseModule, ProjectsModule, OrgsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
