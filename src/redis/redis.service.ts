import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RedisOperationsService implements OnModuleInit {
  constructor(
    private userService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    await this.saveUsers();
  }

  async saveUsers() {
    const client = this.redisService.getClient();
    const users = await this.userService.getRandomUsers();
    const data = JSON.stringify(users);
    await client.set('users', data);
  }

  async getUsers() {
    const client = this.redisService.getClient();
    const usersString = await client.get('users');
    const users = JSON.parse(usersString);
    return users;
  }
}
