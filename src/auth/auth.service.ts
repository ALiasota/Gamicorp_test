import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(userDto: CreateUserDto) {
    await this.validateUser(userDto);
    const users = await this.userService.getRandomUsers();
    return users;
  }

  async register(userDto: CreateUserDto) {
    const existedUser = await this.userService.getUserByName(userDto.name);
    if (existedUser)
      throw new HttpException(
        'User already registered',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const users = await this.userService.getRandomUsers();
    return users;
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByName(userDto.name);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) return user;
    throw new UnauthorizedException({ message: 'Wrong name or password' });
  }
}
