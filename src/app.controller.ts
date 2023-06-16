import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('users')
  async summation(data: any[]) {
    console.log(`Adding : ${data.toString()}`);
    return this.appService.saveUsers(data);
  }
}
