import { Test, TestingModule } from '@nestjs/testing';
import { BuggyController } from './buggy.controller';

describe('BuggyController', () => {
  let controller: BuggyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuggyController],
    }).compile();

    controller = module.get<BuggyController>(BuggyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
