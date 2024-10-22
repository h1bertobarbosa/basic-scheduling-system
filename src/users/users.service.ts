import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingService } from 'src/libs/hashing/hashing.service';
interface FindOneFilter {
  id: string;
  email: string;
  accountId: string;
}
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private hashingService: HashingService) { }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.userModel.findOne({ email: user.email, accountId: user.accountId });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashingService.hashPassword(user.password);
    user.password = hashedPassword;
    return this.userModel.create(user);
  }

  async findOneBy(filter: Partial<FindOneFilter>): Promise<UserDocument> {
    return this.userModel.findOne(filter);
  }
}
