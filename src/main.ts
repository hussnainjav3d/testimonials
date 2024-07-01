import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PrismaClientExceptionFilter } from 'filters/prisma-constraints-filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingMiddleware } from 'middlewares/logging.middleware';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'filters/prisma-constraints-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.use(new LoggingMiddleware().use);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Testimonials')
    .setDescription('The Testimonials API')
    .setVersion('1.0')
    .addTag('testimonials')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}
bootstrap();
