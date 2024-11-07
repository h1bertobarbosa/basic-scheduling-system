import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema, Appointment } from './schemas/appointment.schema';
import { ClientsModule } from 'src/clients/clients.module';
import { ProfessionalsModule } from 'src/professionals/professionals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    ClientsModule,
    ProfessionalsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
