import { TransactionalRepository } from './transactional.repository';

describe('TransactionalRepository', () => {
  it('should be defined', () => {
    expect(new TransactionalRepository()).toBeDefined();
  });
});
