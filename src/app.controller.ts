import { Controller, Get, Param } from '@nestjs/common';
import { PaginatedResponseV3Adapter } from '@moralisweb3/api-utils';
import {
  EvmErc20TokenBalanceWithPriceResult,
  EvmErc20TokenBalanceWithPriceResultJSON,
} from '@moralisweb3/common-evm-utils';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance/:chainId/:address')
  async getBalance(
    @Param('chainId') chainId: string,
    @Param('address') address: string,
  ): Promise<
    PaginatedResponseV3Adapter<
      EvmErc20TokenBalanceWithPriceResult,
      EvmErc20TokenBalanceWithPriceResultJSON
    >
  > {
    return this.appService.getBalance(chainId, address);
  }
}
