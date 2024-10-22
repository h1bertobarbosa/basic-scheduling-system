import { UserDocument } from "src/users/schemas/user.schema";

export class OutputRegisterDto {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  private constructor(user: any) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.enabled = user.enabled;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static getInstanceFromCollection(user: UserDocument) {
    return new OutputRegisterDto(user);
  }
}
