import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

export class QueryParamsProfessionalDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  professionalId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  clientId?: string;

  @IsOptional()
  accountId: string;
}
