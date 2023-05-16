import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import UserController from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import TicketController from './ticket.controller';
import { TicketService } from './ticket.service';
import { FindUser } from './middlewares/user.middleware';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])
  ],
  controllers: [UserController,TicketController],
  providers: [UserService,TicketService],
})

// export default class UserModule {}
export default class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(FindUser)
    .forRoutes('user/:username')
  }
}