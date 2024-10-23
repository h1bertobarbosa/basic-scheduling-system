import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ default: 1 })
  @Transform((value) => Number(value) || 1)
  @IsOptional()
  page: number;

  @ApiProperty({ default: 10, name: 'per-page' })
  @Transform((value) => Number(value) || 10)
  @Expose({ name: 'per-page' })
  @IsOptional()
  perPage: number;
}
