import { Injectable, Scope } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
  private transactionManager: EntityManager | null;

  constructor(private connection: Connection) {}

  getConnection(): Connection {
    return this.connection;
  }

  getTransactionManager(): EntityManager | null {
    return this.transactionManager;
  }

  async withTransaction<T>(work: () => T): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.transactionManager = queryRunner.manager;

    try {
      const result = await work();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      this.transactionManager = null;
    }
  }
}
