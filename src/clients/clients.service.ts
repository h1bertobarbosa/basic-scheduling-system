import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/client.schema';
import { Model } from 'mongoose';
import { OutputClientDto } from './dto/output-client.dto';
interface FilterFindAll {
  accountId: string;
  page: number;
  perPage: number;
}
@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<OutputClientDto> {
    const hasClient = await this.clientModel.exists({
      accountId: createClientDto.accountId,
      phone: createClientDto.phone,
    });
    if (hasClient) {
      throw new BadRequestException('Client already exists');
    }

    const createdClient = await this.clientModel.create(createClientDto);
    return OutputClientDto.getInstanceFromCollection(createdClient);
  }

  async findAll(filter: FilterFindAll) {
    const { page, perPage, accountId } = filter;
    const skip = (page - 1) * perPage;

    const [results, total] = await Promise.all([
      this.clientModel.find({ accountId }).skip(skip).limit(perPage).exec(),
      this.clientModel.countDocuments({ accountId }).exec(),
    ]);
    return {
      data: results.map((client) =>
        OutputClientDto.getInstanceFromCollection(client),
      ),
      meta: {
        total,
        page,
        perPage,
      },
    };
  }

  async findOne(id: string, accountId: string): Promise<OutputClientDto> {
    const client = await this.clientModel.findById(id);
    if (!client || String(client.accountId) !== accountId) {
      throw new NotFoundException('Client not found');
    }
    return OutputClientDto.getInstanceFromCollection(client);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const { accountId, ...data } = updateClientDto;
    const clientUpdated = await this.clientModel.findOneAndUpdate(
      { _id: id, accountId },
      { $set: data },
      { new: true },
    );
    return OutputClientDto.getInstanceFromCollection(clientUpdated);
  }

  async remove(id: string, accountId: string) {
    const professional = await this.clientModel.findById(id);
    if (!professional || String(professional.accountId) !== accountId) {
      throw new NotFoundException('Client not found');
    }
    await this.clientModel.deleteOne({ _id: id });
  }
}
