import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "src/users/schemas/user.schema";

export class OutputRegisterDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  enabled: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  private constructor(user: any) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.enabled = Boolean(user.enabled);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static getInstanceFromCollection(user: UserDocument) {
    return new OutputRegisterDto(user);
  }
}
