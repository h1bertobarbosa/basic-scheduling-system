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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UserSession } from 'src/auth/decorators/user-session.decorator';
import { OutputClientDto } from './dto/output-client.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiCreatedResponse({ type: OutputClientDto })
  async create(
    @Body() createClientDto: CreateClientDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.clientsService.create({
      ...createClientDto,
      accountId: userSession.accountId,
    });
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.clientsService.findAll({
      ...query,
      accountId: userSession.accountId,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: OutputClientDto })
  async findOne(
    @Param('id') id: string,
    @UserSession() userSession: UserSession,
  ) {
    return this.clientsService.findOne(id, userSession.accountId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: OutputClientDto })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.clientsService.update(id, {
      ...updateClientDto,
      accountId: userSession.accountId,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @UserSession() userSession: UserSession,
  ) {
    await this.clientsService.remove(id, userSession.accountId);
  }
}
