import {
  BadGatewayException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import Moralis from 'moralis';
import { PaginatedResponseV3Adapter } from '@moralisweb3/api-utils';
import {
  EvmErc20TokenBalanceWithPriceResult,
  EvmErc20TokenBalanceWithPriceResultJSON,
} from '@moralisweb3/common-evm-utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoralisService implements OnModuleInit {
  private logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger();
  }

  public async onModuleInit() {
    try {
      await Moralis.start({
        apiKey: this.configService.get('MORALIS_API_KEY'),
      });

      console.log('Moralis initialized successfully');
    } catch (error) {
      console.error('Error initializing Moralis:', error);
    }
  }

  public async getBalance(
    chain: string,
    address: string,
  ): Promise<
    PaginatedResponseV3Adapter<
      EvmErc20TokenBalanceWithPriceResult,
      EvmErc20TokenBalanceWithPriceResultJSON
    >
  > {
    try {
      const balance = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain,
        address,
      });

      return balance;
    } catch (error) {
      this.logger.log(error);
      throw new BadGatewayException('Blockchain API not available.');
    }
  }
}
