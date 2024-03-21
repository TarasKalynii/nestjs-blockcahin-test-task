import { Provider } from '@nestjs/common';
import { MoralisService } from './moralis.service';
import { MockType } from '../../test/mock-type';

const moralisServiceMockFactory: () => MockType<MoralisService> = jest.fn(
  () => ({
    onModuleInit: jest.fn(),
    getBalance: jest.fn(),
  }),
);

export const MoralisServiceMock: Provider = {
  provide: MoralisService,
  useFactory: moralisServiceMockFactory,
};
