import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(input: QueryParamsProfessionalDto) {
    const { page, perPage, accountId, professionalId, clientId } = input;
    const skip = (page - 1) * perPage;

    const filter = {
      accountId,
    };
    if (professionalId) {
      filter['professional.id'] = professionalId;
    }
    if (clientId) {
      filter['client.id'] = clientId;
    }

    const [results, total] = await Promise.all([
      this.appointmentModel.find(filter).skip(skip).limit(perPage).exec(),
      this.appointmentModel.countDocuments(filter).exec(),
    ]);

    return {
      data: results.map((appointment) =>
        OutputAppointmentDto.getInstanceFromCollection(appointment),
      ),
      meta: {
        total,
        page,
        perPage,
      },
    };
  }

  async findOne(id: string, accountId: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment || String(appointment.accountId) !== accountId) {
      throw new NotFoundException('Appointment not found');
    }
    return OutputAppointmentDto.getInstanceFromCollection(appointment);
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<OutputAppointmentDto> {
    const { accountId, clientId, professionalId, ...data } =
      updateAppointmentDto;

    const existingAppointment = await this.appointmentModel.findById(id);
    if (
      !existingAppointment ||
      String(existingAppointment.accountId) !== accountId
    ) {
      throw new NotFoundException('Appointment not found');
    }

    const updateData: any = { ...data };

    if (clientId || professionalId) {
      const promises = [];

      if (clientId) {
        promises.push(this.clientsService.findOne(clientId, accountId));
      }

      if (professionalId) {
        promises.push(
          this.professionalsService.findOne(professionalId, accountId),
        );
      }

      const results = await Promise.all(promises);
      let resultIndex = 0;

      if (clientId) {
        const client = results[resultIndex++];
        updateData.client = {
          id: client.id,
          name: client.name,
        };
      }

      if (professionalId) {
        const professional = results[resultIndex++];
        updateData.professional = {
          id: professional.id,
          name: professional.name,
        };
      }
    }

    const appointmentUpdated = await this.appointmentModel.findOneAndUpdate(
      { _id: id, accountId },
      { $set: updateData },
      { new: true },
    );

    return OutputAppointmentDto.getInstanceFromCollection(appointmentUpdated);
  }

  async remove(id: string, accountId: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment || String(appointment.accountId) !== accountId) {
      throw new NotFoundException('Appointment not found');
    }
    await this.appointmentModel.deleteOne({ _id: id });
  }
}
