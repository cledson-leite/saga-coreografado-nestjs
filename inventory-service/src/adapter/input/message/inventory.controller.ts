import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DebitInventoryInput } from '../../../application/ports/input/debit-inventory.input';
import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';
import { SaleMessage } from '../../output/message/sale.message';
import { CreditInventoryInput } from '../../../application/ports/input/credit-inventory.input';

@Controller()
export class InventoryController {
  private readonly logger: Logger = new Logger('Inventory');
  constructor(
    @Inject('input')
    private readonly input: DebitInventoryInput,
    @Inject('usecase')
    private readonly rollback: CreditInventoryInput,
  ) {}
  @MessagePattern('saga-sale')
  debit(@Payload() message: SaleMessage) {
    const { sale } = message;
    this.logger.log('Iniciando separação ...');
    this.input.debit(sale);
    this.logger.log('Mercadoria separada');
  }
  @MessagePattern('saga-payment')
  credit(@Payload() message: SaleMessage) {
    const { sale, event } = message;
    if (SaleEvent.FAILED_PAYMENT === event) {
      this.logger.log('Iniciando estorno de mercadoria ...');
      this.rollback.credit(sale);
      this.logger.log('Mercadoria estornada');
    }
  }
}
