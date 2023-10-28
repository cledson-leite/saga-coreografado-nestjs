import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DebitInventoryInput } from '../../../application/ports/input/debit-inventory.input';
import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';
import { SaleMessage } from '../../output/message/sale.message';

@Controller()
export class InventoryController {
  private readonly logger: Logger = new Logger('Inventory');
  constructor(
    @Inject('input')
    private readonly input: DebitInventoryInput,
  ) {}
  @MessagePattern('saga-sale')
  debit(@Payload() message: SaleMessage) {
    const { sale, event } = message;
    if (SaleEvent.CREATED_SALE === event) {
      this.logger.log('Iniciando separação ...');
      this.input.debit(sale);
      this.logger.log('Mercadoria separada');
    }
  }
}
