import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({
    default:"i have new ticket!"
  })
  description: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId, ref: 'User' 
  })
  createdBy: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);