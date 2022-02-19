import { TransactionalRepository } from './transactional.repository';
import { Module } from '@nestjs/common';
import { UnitOfWork } from './unit-of-work';

@Module({
  providers: [TransactionalRepository, UnitOfWork],
  exports: [TransactionalRepository],
})
export class CommonModule {}
