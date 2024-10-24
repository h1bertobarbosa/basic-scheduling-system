import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { UserSession } from 'src/auth/decorators/user-session.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputProfessionalDto } from './dto/output-professional.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Controller('professionals')
@ApiTags('Professionals')
@ApiBearerAuth()
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  @ApiCreatedResponse({ type: OutputProfessionalDto })
  create(
    @Body() createProfessionalDto: CreateProfessionalDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.professionalsService.create({
      ...createProfessionalDto,
      accountId: userSession.accountId,
    });
  }

  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.professionalsService.findAll({
      ...query,
      accountId: userSession.accountId,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: OutputProfessionalDto })
  findOne(@Param('id') id: string, @UserSession() userSession: UserSession) {
    return this.professionalsService.findOne(id, userSession.accountId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: OutputProfessionalDto })
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
    @UserSession() userSession: UserSession,
  ) {
    return this.professionalsService.update(id, {
      ...updateProfessionalDto,
      accountId: userSession.accountId,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @UserSession() userSession: UserSession,
  ) {
    await this.professionalsService.remove(id, userSession.accountId);
  }
}
