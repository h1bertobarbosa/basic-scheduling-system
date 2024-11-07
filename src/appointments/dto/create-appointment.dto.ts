import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsObject, IsOptional, IsString } from 'class-validator';

class Schedule {
  @ApiProperty({ required: true })
  @IsDateString()
  day: Date;
  @ApiProperty({ required: true })
  @IsString()
  start: string;
  @ApiProperty({ required: true })
  @IsString()
  end: string;
}
export class CreateAppointmentDto {
  @ApiProperty({ required: true })
  @IsString()
  professionalId: string;
  @IsString()
  @ApiProperty({ required: true })
  clientId: string;
  @IsString()
  @ApiProperty({ required: true })
  obs: string;
  @IsObject()
  @ApiProperty({ required: true, type: Schedule })
  schedule: Schedule;
  @IsOptional()
  accountId: string;
}
