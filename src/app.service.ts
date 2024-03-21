import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginatedResponseV3Adapter } from '@moralisweb3/api-utils';
import {
  EvmErc20TokenBalanceWithPriceResult,
  EvmErc20TokenBalanceWithPriceResultJSON,
} from '@moralisweb3/common-evm-utils';
import { MoralisService } from './moralis/moralis.service';
import { SupportedChainIds } from './types';

@Injectable()
export class AppService {
  constructor(private readonly moralisService: MoralisService) {}

  public async getBalance(
    chainId: string,
    address: string,
  ): Promise<
    PaginatedResponseV3Adapter<
      EvmErc20TokenBalanceWithPriceResult,
      EvmErc20TokenBalanceWithPriceResultJSON
    >
  > {
    this.validateRequest(chainId);

    return this.moralisService.getBalance(chainId, address);
  }

  private validateRequest(chainId: string): void {
    if (!SupportedChainIds.has(chainId)) {
      throw new BadRequestException();
    }
  }
}
