import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  accountId: ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  document: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client).index(
  { accountId: 1, phone: 1 },
  { unique: true },
);
