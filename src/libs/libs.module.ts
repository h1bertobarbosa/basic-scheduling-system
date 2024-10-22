import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [HashingService],
  exports: [HashingService],
})
export class LibsModule { }
