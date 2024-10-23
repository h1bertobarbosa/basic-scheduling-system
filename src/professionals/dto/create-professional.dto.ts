import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProfessionalDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @IsOptional()
  accountId: string;
}
