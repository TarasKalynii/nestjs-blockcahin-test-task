import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { MoralisService } from './moralis/moralis.service';
import { MoralisServiceMock } from './moralis/moralis.service.mock';
import SpyInstance = jest.SpyInstance;

describe('AppService', () => {
  let appService: AppService;
  let moralisService: MoralisService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, MoralisServiceMock],
    }).compile();

    appService = app.get<AppService>(AppService);
    moralisService = app.get<MoralisService>(MoralisService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
    expect(moralisService).toBeDefined();
  });

  describe('getBalance', () => {
    let validateRequest: SpyInstance;

    beforeAll(() => {
      validateRequest = jest
        .spyOn(appService as any, 'validateRequest')
        .mockImplementation();
    });

    afterAll(() => {
      validateRequest.mockRestore();
    });

    it('should throw error is request validation fails', async () => {
      validateRequest.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      await expect(
        appService.getBalance('chainId', 'address'),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should start getting wallet balance', async () => {
      await appService.getBalance('chainId', 'address');

      expect(moralisService.getBalance).toHaveBeenCalledWith(
        'chainId',
        'address',
      );
    });
  });

  describe('validateRequest', () => {
    it('should throw error if not supported chain id provided', () => {
      expect(() =>
        (appService as any).validateRequest('wrongChainId'),
      ).toThrowError();
    });

    it('should pass if supported chain id provided', () => {
      (appService as any).validateRequest('0x1');
    });
  });
});
