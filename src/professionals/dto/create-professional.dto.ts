import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ScheduleAvailability } from './professional-shared.dto';

export class CreateProfessionalDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @IsOptional()
  accountId: string;

  @ApiProperty({ required: true, type: [ScheduleAvailability] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Valida cada item do array
  @Type(() => ScheduleAvailability) // Transforma o objeto para validar
  readonly scheduleAvailability: ScheduleAvailability[];
}
