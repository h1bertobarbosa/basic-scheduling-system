import { ApiProperty } from '@nestjs/swagger';
import { ClientDocument } from '../schemas/client.schema';

export class OutputClientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  private constructor(client: any) {
    this.id = client._id || client.id;
    this.name = client.name;
    this.phone = client.phone;
    this.document = client.document;
    this.email = client.email;
    this.createdAt = client.createdAt;
    this.updatedAt = client.updatedAt;
  }

  static getInstanceFromCollection(
    professional: ClientDocument,
  ): OutputClientDto {
    return new OutputClientDto(professional);
  }
}
