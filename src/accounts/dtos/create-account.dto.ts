import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  companyName: string;

  @IsString()
  document: string;
}
