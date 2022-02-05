import { Module } from '@nestjs/common';
import { BuggyController } from './buggy.controller';

@Module({
  controllers: [BuggyController]
})
export class BuggyModule {}
