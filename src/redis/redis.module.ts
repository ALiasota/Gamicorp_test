import { Module, forwardRef } from '@nestjs/common';
import { RedisOperationsService } from './redis.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, forwardRef(() => AuthModule)],
  controllers: [],
  providers: [RedisOperationsService],
  exports: [RedisOperationsService],
})
export class RedisOperationsModule {}
