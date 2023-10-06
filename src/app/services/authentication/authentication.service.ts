import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from '../Users/schemas/user.schema';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async register(user: CreateUserDto) {
    return new this.userModel(CreateUserDto).save();
  }
}
