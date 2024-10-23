import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalDocument } from '../schemas/professional.schema';

export class OutputProfessionalDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  private constructor(professional: any) {
    this.id = professional._id;
    this.name = professional.name;
    this.enabled = Boolean(professional.enabled);
    this.createdAt = professional.createdAt;
    this.updatedAt = professional.updatedAt;
  }

  static getInstanceFromCollection(professional: ProfessionalDocument) {
    return new OutputProfessionalDto(professional);
  }
}
