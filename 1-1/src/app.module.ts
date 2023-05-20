import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userModule from './user/user.module';
import AuthModule from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-crud'), userModule, AuthModule],
})

export class AppModule {}
