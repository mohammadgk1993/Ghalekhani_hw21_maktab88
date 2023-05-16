import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userModule from './user/user.module';
import { FindUser } from './user/middlewares/user.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-crud'), userModule]
})

export class AppModule {}
