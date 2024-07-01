import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { OrgsModule } from './orgs/orgs.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, ProjectsModule, OrgsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
