import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
