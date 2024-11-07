import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProfessionalsService } from 'src/professionals/professionals.service';
import { ClientsService } from 'src/clients/clients.service';
import { QueryParamsProfessionalDto } from 'src/professionals/dto/query-params-professional.dto';
import { OutputProfessionalDto } from 'src/professionals/dto/output-professional.dto';
import { OutputAppointmentDto } from './dto/output-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,
    private readonly clientsService: ClientsService,
    private readonly professionalsService: ProfessionalsService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    console.log(createAppointmentDto);
    const [client, professional] = await Promise.all([
      this.clientsService.findOne(
        createAppointmentDto.clientId,
        createAppointmentDto.accountId,
      ),
      this.professionalsService.findOne(
        createAppointmentDto.professionalId,
        createAppointmentDto.accountId,
      ),
    ]);
    return this.appointmentModel.create({
      ...createAppointmentDto,
      client: {
        id: client.id,
        name: client.name,
      },
      professional: {
        id: professional.id,
        name: professional.name,
      },
    });
  }

  async findAll(
    input: QueryParamsProfessionalDto,
  ): Promise<OutputAppointmentDto[]> {
    const appointments = await this.appointmentModel.find({
      accountId: input.accountId,
      professional: {
        id: input.professionalId,
      },
    });
    return appointments.map((appointment) =>
      OutputAppointmentDto.getInstanceFromCollection(appointment),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
