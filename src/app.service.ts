import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  saveUsers(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}
