import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop()
  accountId: ObjectId;
  @Prop(
    raw({
      id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
    }),
  )
  professional: Record<string, any>;
  @Prop(
    raw({
      id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
    }),
  )
  client: Record<string, any>;
  @Prop({ default: 'pending' })
  status: string;
  @Prop(
    raw({
      day: Date,
      start: String,
      end: String,
    }),
  )
  schedule: Record<string, any>;
  @Prop({ required: false })
  obs: string;
  @Prop({ type: Date, required: false })
  canceledAt: Date;
  @Prop({ required: false })
  canceledBy: string;
  @Prop({ required: false })
  confirmedBy: string;
  @Prop({ required: false })
  doneBy: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
  .index({ accountId: 1, 'professional.id': 1 })
  .index({ accountId: 1, 'client.id': 1 });
