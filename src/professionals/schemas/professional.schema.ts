import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop(
    raw([
      {
        dayOfWeek: { type: String },
        hours: [
          {
            start: { type: String },
            end: { type: String },
          },
        ],
      },
    ]),
  )
  scheduleAvailability: Record<string, any>[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(
  Professional,
).index({ accountId: 1, name: 1 }, { unique: true });
