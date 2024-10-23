import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';
import { IsBoolean } from 'class-validator';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {
  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}
