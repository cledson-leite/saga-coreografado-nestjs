import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';
import { Sale } from '../../../application/core/domain/sale';

export class SaleMessage {
	constructor(
		private sale: Sale,
		private event: SaleEvent,
	) {}
}
