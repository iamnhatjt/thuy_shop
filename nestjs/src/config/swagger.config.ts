import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appToken } from './app.config';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const {
    title,
    port,
    path,
    swaggerEnable: enable,
  } = configService.get(appToken);

  if (!enable) return;

  const documentBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(`${title} API document`)
    .setVersion('1.0');

  // auth security
  documentBuilder.addBearerAuth({
    description: `Please enter token in following format: <JWT>`,
    name: 'Authorization',
    bearerFormat: 'Bearer',
    type: 'http',
    in: 'Header',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    // extraModels: [CommonEntity, ResOp, Pagination, TreeResult],
  });

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const logger = new Logger('SwaggerModule');
  logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
}
