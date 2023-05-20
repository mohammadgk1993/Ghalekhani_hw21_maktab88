import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Ticket, TicketSchema } from '../user/schemas/ticket.schema';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])
  ],
  controllers: [AuthController]
})

export default class AuthModule {}