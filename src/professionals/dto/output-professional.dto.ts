import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalDocument } from '../schemas/professional.schema';
import { ScheduleAvailability } from './professional-shared.dto';

export class OutputProfessionalDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ type: [ScheduleAvailability] })
  scheduleAvailability: ScheduleAvailability[];
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  private constructor(professional: any) {
    this.id = professional._id || professional.id;
    this.name = professional.name;
    this.enabled = Boolean(professional.enabled);
    this.scheduleAvailability = professional.scheduleAvailability.map(
      (item) => {
        return {
          dayOfWeek: item.dayOfWeek,
          hours: item.hours.map((hour) => {
            return {
              start: hour.start,
              end: hour.end,
            };
          }),
        };
      },
    );
    this.createdAt = professional.createdAt;
    this.updatedAt = professional.updatedAt;
  }

  static getInstanceFromCollection(professional: ProfessionalDocument) {
    return new OutputProfessionalDto(professional);
  }
}
