import { Injectable, Scope } from '@nestjs/common';
import { EntitySchema, getRepository, ObjectType, Repository } from 'typeorm';
import { RepositoryFactory } from 'typeorm/repository/RepositoryFactory';
import { UnitOfWork } from './unit-of-work';

@Injectable({ scope: Scope.REQUEST })
export class TransactionalRepository {
  constructor(private uow: UnitOfWork) {}

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    const transactionManager = this.uow.getTransactionManager();

    if (transactionManager) {
      const connection = this.uow.getConnection();

      const metadata = connection.getMetadata(target);
      return new RepositoryFactory().create(transactionManager, metadata);
    }

    return getRepository(target);
  }
}
