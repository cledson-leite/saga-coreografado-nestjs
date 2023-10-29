import { BadRequestException } from '@nestjs/common';
import { FindUserByIdInput } from '../../ports/input/find-user-by-id.input';
import { SalePaymentInput } from '../../ports/input/sale-payment.input';
import { SavePaymentOutput } from '../../ports/output/save-payment.output';
import { UpdateUserOutput } from '../../ports/output/update-user.output';
import { SendToKafkaOutput } from '../../ports/output/send-to-kafka.output';
import { SaleEvent } from '../domain/enums/sale-event.enum';
import { Payment } from '../domain/payment';
import { Sale } from '../domain/sale';

export class SalePaymentUseCase implements SalePaymentInput {
  constructor(
    private readonly findUser: FindUserByIdInput,
    private readonly updateUser: UpdateUserOutput,
    private readonly savePayment: SavePaymentOutput,
    private readonly kafka: SendToKafkaOutput,
  ) {}
  async payment(sale: Sale): Promise<void> {
    const user = await this.findUser.find(sale.userId);
    if (user.balance < sale.value) {
      throw new BadRequestException('Saldo insuficiente');
    }
    user.debitBalance(sale.value);
    this.updateUser.update(user);
    const payment = new Payment(
      sale.userId,
      sale.id,
      sale.productId,
      sale.value,
    );
    this.savePayment.save(payment);
    this.kafka.send(sale, SaleEvent.VALIDATED_PAYMENT);
  }
}
