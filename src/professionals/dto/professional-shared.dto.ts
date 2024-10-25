import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ScheduleAvailabilityHour {
  @ApiProperty({ required: true, example: '08:00' })
  @IsString()
  start: string;

  @ApiProperty({ required: true, example: '12:00' })
  @IsString()
  end: string;
}
export class ScheduleAvailability {
  @ApiProperty({ required: true, example: 'monday' })
  @IsString()
  @IsIn([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ])
  dayOfWeek: string;

  @ApiProperty({ required: true, type: [ScheduleAvailabilityHour] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Valida cada item do array
  @Type(() => ScheduleAvailabilityHour)
  hours: ScheduleAvailabilityHour[];
}
