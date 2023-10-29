import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';
import { Sale } from '../../../application/core/domain/sale';

export class SaleMessage {
	constructor(
		public sale: Sale,
		public event: SaleEvent,
	) {}
}
