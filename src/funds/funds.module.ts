import { Module } from '@nestjs/common';
import { FundsService } from './funds.service';
import { FundsController } from './funds.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FundsController],
  providers: [FundsService],
})
export class FundsModule { }
