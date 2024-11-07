import { ApiProperty } from '@nestjs/swagger';
import { AppointmentDocument } from '../schemas/appointment.schema';

class ClientAndProfessional {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
class Schedule {
  @ApiProperty()
  day: Date;
  @ApiProperty()
  start: string;
  @ApiProperty()
  end: string;
}
export class OutputAppointmentDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: ClientAndProfessional })
  client: ClientAndProfessional;
  @ApiProperty({ type: ClientAndProfessional })
  professional: ClientAndProfessional;
  @ApiProperty({ type: Schedule })
  schedule: Schedule;
  @ApiProperty()
  obs: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  private constructor(appointment: any) {
    this.id = appointment._id || appointment.id;
    this.status = appointment.status;
    this.client = {
      id: appointment.client.id,
      name: appointment.client.name,
    };
    this.professional = {
      id: appointment.professional.id,
      name: appointment.professional.name,
    };
    this.schedule = {
      day: appointment.schedule.day,
      start: appointment.schedule.start,
      end: appointment.schedule.end,
    };
    this.obs = appointment.obs;
    this.createdAt = appointment.createdAt;
    this.updatedAt = appointment.updatedAt;
  }

  static getInstanceFromCollection(appointment: AppointmentDocument) {
    return new OutputAppointmentDto(appointment);
  }
}
