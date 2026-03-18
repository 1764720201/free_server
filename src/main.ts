import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ProxyAgent, setGlobalDispatcher } from 'undici'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const agent = new ProxyAgent('http://127.0.0.1:7890')
  setGlobalDispatcher(agent)

  const config = new DocumentBuilder()
    .setTitle('Free API')
    .setDescription('Free API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const documentFactory = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
