import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', '../public'))
  app.setBaseViewsDir(join(__dirname, '..', '../views'))
  app.setViewEngine("ejs")
  app.use(cookieParser());
  const oneDay = 1000 * 60 * 60 * 24;
  app.use(session({
    secret: "mySecrectKeyForAuthProject",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
  }));
  await app.listen(3000, () => console.log('Server running on port 3000'));
}

bootstrap();