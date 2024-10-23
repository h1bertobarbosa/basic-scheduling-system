import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ProfessionalDocument = HydratedDocument<Professional>;

@Schema({ timestamps: true })
export class Professional {
  @Prop()
  accountId: ObjectId;

  @Prop()
  name: string;

  @Prop()
  enabled: boolean;
}

export const ProfessionalSchema = SchemaFactory.createForClass(
  Professional,
).index({ accountId: 1, name: 1 }, { unique: true });
