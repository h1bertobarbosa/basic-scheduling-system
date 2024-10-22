import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop()
  companyName: string;

  @Prop()
  document: string;

  @Prop()
  status: string;

  @Prop()
  slug: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account).index(
  { slug: 1 },
  { unique: true },
);
