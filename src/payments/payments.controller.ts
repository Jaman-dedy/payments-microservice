import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Controller()
export class PaymentsMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsclient: ClientProxy) {}
  @EventPattern('createPayment')
  createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    console.log('createPaymentDto payment :>> ', createPaymentDto);
    this.natsclient.emit('paymentCreated', createPaymentDto);
  }
}
