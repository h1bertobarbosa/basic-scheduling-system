import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './schemas/professional.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OutputProfessionalDto } from './dto/output-professional.dto';
interface FilterFindAll {
  accountId: string;
  page: number;
  perPage: number;
}
@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<Professional>,
  ) {}
  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<OutputProfessionalDto> {
    const newProfessional = await this.professionalModel.create({
      ...createProfessionalDto,
      enabled: true,
    });
    return OutputProfessionalDto.getInstanceFromCollection(newProfessional);
  }

  async findAll(filter: FilterFindAll) {
    const { page, perPage, accountId } = filter;
    const skip = (page - 1) * perPage;

    const [results, total] = await Promise.all([
      this.professionalModel
        .find({ accountId })
        .skip(skip)
        .limit(perPage)
        .exec(),
      this.professionalModel.countDocuments({ accountId }).exec(),
    ]);
    return {
      data: results.map((professional) =>
        OutputProfessionalDto.getInstanceFromCollection(professional),
      ),
      meta: {
        total,
        page,
        perPage,
      },
    };
  }

  async findOne(id: string, accountId: string) {
    const professional = await this.professionalModel.findById(id);
    if (!professional || String(professional.accountId) !== accountId) {
      throw new NotFoundException('Professional not found');
    }
    return OutputProfessionalDto.getInstanceFromCollection(professional);
  }

  async update(
    id: string,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<OutputProfessionalDto> {
    const { accountId, ...data } = updateProfessionalDto;
    const professionalUpdated = await this.professionalModel.findOneAndUpdate(
      { _id: id, accountId },
      data,
    );
    return OutputProfessionalDto.getInstanceFromCollection(professionalUpdated);
  }

  async remove(id: string, accountId: string) {
    const professional = await this.professionalModel.findById(id);
    if (!professional || String(professional.accountId) !== accountId) {
      throw new NotFoundException('Professional not found');
    }
    await this.professionalModel.deleteOne({ _id: id });
  }
}
