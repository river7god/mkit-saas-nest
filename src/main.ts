import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './system/exception/all-exception.filter';
import { HttpExceptionFilter } from './system/exception/http-exception.filter';
import { LogInterceptor } from './system/log/log.interceptor';
import { ReportLogger } from './system/log/ReportLogger';

async function bootstrap() {
  const reportLogger = new ReportLogger();

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    bufferLogs: true,
    logger: reportLogger,
  });
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // exception filter
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());

  //Cors 允许跨域
  app.enableCors(); 

  app.setGlobalPrefix('api');


  // log 格式化
  //app.useGlobalInterceptors(new LogInterceptor(reportLogger));

  await app.listen(4200);
}
bootstrap();
