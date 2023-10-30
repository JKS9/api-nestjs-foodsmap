import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Tag } from './schema/tag.schema';
import { CreateDtoTag } from 'src/common/dto/tag/createTag.dto';
import { UpdateTagDto } from 'src/common/dto/tag/updateTag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(tag: CreateDtoTag, userId: string) {
    tag.createdBy = new mongoose.Types.ObjectId(userId);

    try {
      return await new this.tagModel(tag).save();
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  async findAllUser(userId: string) {
    return await this.tagModel
      .find({
        createdBy: new mongoose.Types.ObjectId(userId),
      })
      .exec();
  }

  async updateOne(tag: UpdateTagDto, userId: string) {
    return this.tagModel
      .updateOne(
        {
          _id: new mongoose.Types.ObjectId(tag._id),
          createdBy: new mongoose.Types.ObjectId(userId),
        },
        tag,
      )
      .exec();
  }

  async deleteOne(id: string, userId: string) {
    try {
      await this.tagModel
        .findOneAndDelete({
          createdBy: new mongoose.Types.ObjectId(userId),
          _id: new mongoose.Types.ObjectId(id),
        })
        .exec();

      return {
        message: 'Document Delete',
      };
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
