import { Test, TestingModule } from '@nestjs/testing';
import { OwnersResolver } from './owners.resolver';
import { OwnersService } from './owners.service';

describe('OwnersResolver', () => {
  let resolver: OwnersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersResolver, OwnersService],
    }).compile();

    resolver = module.get<OwnersResolver>(OwnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
