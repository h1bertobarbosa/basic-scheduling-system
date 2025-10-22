import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSession } from 'src/auth/decorators/user-session.decorator';
import { ClientsService } from 'src/clients/clients.service';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { QueryParamsProfessionalDto } from 'src/professionals/dto/query-params-professional.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.appointmentsService.create({
      ...createAppointmentDto,
      accountId: userSession.accountId,
    });
  }

  @Get()
  findAll(
    @Query() query: QueryParamsProfessionalDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.appointmentsService.findAll({
      ...query,
      accountId: userSession.accountId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserSession() userSession: UserSession) {
    return this.appointmentsService.findOne(id, userSession.accountId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.appointmentsService.update(id, {
      ...updateAppointmentDto,
      accountId: userSession.accountId,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @UserSession() userSession: UserSession,
  ) {
    await this.appointmentsService.remove(id, userSession.accountId);
  }
}
