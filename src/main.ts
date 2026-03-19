import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Free API')
    .setDescription('Free API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const documentFactory = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
