import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReplyDocument = HydratedDocument<Reply>;

@Schema()
export class Reply {
  @Prop({
    required: true
  })
  description: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId, ref: 'Ticket' 
  })
  replyTo: string;
}

export const TicketSchema = SchemaFactory.createForClass(Reply);