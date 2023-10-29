import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalePaymentInput } from '../../../application/ports/input/sale-payment.input';
import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';
import { SaleMessage } from '../../output/message/sale.message';

@Controller()
export class PaymentController {
  private readonly logger: Logger = new Logger('Payment');
  constructor(
    @Inject('input')
    private readonly input: SalePaymentInput,
  ) {}
  @MessagePattern('saga-sale')
  debit(@Payload() message: SaleMessage) {
    const { sale, event } = message;
    if (SaleEvent.UPDATED_INVENTORY === event) {
      this.logger.log('Iniciando pagamento ...');
      this.input.payment(sale);
      this.logger.log('Pagamento realizado com sucesso!!');
    }
  }
}
