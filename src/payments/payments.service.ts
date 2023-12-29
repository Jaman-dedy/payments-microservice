import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './typeorm/entities/Payment';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from './typeorm/entities/User';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('NATS_SERVICE') private natsclient: ClientProxy,
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
  ) {}

  async createPayment({ userId, ...createPayment }: CreatePaymentDto) {
    const user = await lastValueFrom<User>(
      this.natsclient.send({ cmd: 'getUserById' }, { userId }),
    );
    console.log('user :>> ++++ ', user);
    if (user) {
      const newPayment = this.paymentsRepository.create({
        ...createPayment,
        user,
      });
      console.log('newPayment :>> ', newPayment);
      return this.paymentsRepository.save(newPayment);
    }
    return null;
  }
}
