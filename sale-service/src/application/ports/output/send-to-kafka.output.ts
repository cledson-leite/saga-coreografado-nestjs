import { Sale } from '../../core/domain/sale';
import { SaleEvent } from '../../core/domain/enums/sale-event.enum';

export interface SendToKafkaOutput {
	send(sale: Sale, event: SaleEvent): void;
}
