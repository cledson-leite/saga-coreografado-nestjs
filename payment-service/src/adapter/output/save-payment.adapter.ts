import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../application/core/domain/payment';
import { SavePaymentOutput } from '../../application/ports/output/save-payment.output';
import { PaymentEntity } from './entity/payment.entity';

@Injectable()
export class SavePaymentAdapter implements SavePaymentOutput {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
  ) {}
  async save(payment: Payment): Promise<void> {
    const entity = this.repository.create(payment);
    this.repository.save(entity);
  }
}
