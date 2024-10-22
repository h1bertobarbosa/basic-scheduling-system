import { ApiProperty } from '@nestjs/swagger';

export class OutputLoginDto {
  @ApiProperty()
  accessToken: string;

  private constructor(input: any) {
    this.accessToken = input.accessToken;
  }

  static getInstanceFromData(accessToken: string): OutputLoginDto {
    return new OutputLoginDto({ accessToken });
  }
}
