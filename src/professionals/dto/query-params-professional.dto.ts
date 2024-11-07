import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

export class QueryParamsProfessionalDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  professionalId: string;

  @IsOptional()
  accountId: string;
}
