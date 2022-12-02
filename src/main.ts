import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/filters/exception.handler';
const appPort = process.env.PORT || 5000;

async function bootstrap() {
  try {
    //NestFactory to create a Nest application instance.
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // NOTE: body parser
    app.enableCors();
    //@TODO switch to NestFastifyApplication
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    // app.useLogger(customLogger);
    //start up our HTTP listener
    await app.listen(appPort);
    Logger.log(`Nest App Started @ port number :${appPort}`);
  } catch (error) {
    Logger.error(
      `❌  Error starting server, ${error.message}`,
      error,
      'Bootstrap',
    );
    process.exit();
  }
}
bootstrap().catch((error) => {
  Logger.error(
    `❌  Error starting server, ${error.message}`,
    error,
    'Bootstrap',
  );
  throw error;
});
