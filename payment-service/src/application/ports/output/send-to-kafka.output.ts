import { SaleEvent } from '../../core/domain/enums/sale-event.enum';
import { Sale } from '../../core/domain/sale';

export interface SendToKafkaOutput {
  send(sale: Sale, event: SaleEvent): void;
}
