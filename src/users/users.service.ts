import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }

  async getUserByName(name: string) {
    const user = await this.userModel.findOne({ name });
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }

  async getRandomUsers() {
    const users = await this.getAllUsers();
    if (users.length <= 10) return users;

    const shuffledArray = users.slice().sort(() => Math.random() - 0.5);
    return Array.from(new Set(shuffledArray)).slice(0, 10);
  }
}
