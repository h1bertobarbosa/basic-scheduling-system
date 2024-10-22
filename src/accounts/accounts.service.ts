import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './schemas/account.schema';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) { }

  async createAccount(account: CreateAccountDto): Promise<AccountDocument> {
    const slug = this.slugify(account.companyName);
    const existingAccount = await this.accountModel.findOne({ slug });
    if (existingAccount) {
      throw new BadRequestException('Account already exists');
    }
    const createdAccount = new this.accountModel({ ...account, slug, status: 'active' });
    return createdAccount.save();
  }

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
