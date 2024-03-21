import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoralisModule } from './moralis/moralis.module';

@Module({
  imports: [MoralisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
