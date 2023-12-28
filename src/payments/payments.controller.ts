import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsclient: ClientProxy,
    private paymentsService: PaymentsService,
  ) {}
  @EventPattern('createPayment')
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    console.log('createPaymentDto payment :>> ', createPaymentDto);
    const newPayment =
      await this.paymentsService.createPayment(createPaymentDto);
    this.natsclient.emit('paymentCreated', newPayment);
  }
}
