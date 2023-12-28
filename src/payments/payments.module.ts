import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsMicroserviceController } from './payments.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { Payment } from './typeorm/entities/Payment';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), NatsClientModule],
  controllers: [PaymentsMicroserviceController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
