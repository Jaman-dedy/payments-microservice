import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './typeorm/entities/Payment';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
  ) {}

  createPayment(createPayment: CreatePaymentDto) {
    const newPayment = this.paymentsRepository.create(createPayment);
    return this.paymentsRepository.save(newPayment);
  }
}
