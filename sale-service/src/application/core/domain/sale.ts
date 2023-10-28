import { SaleStatus } from './enums/sale-status.enum';

export class Sale {
	constructor(
		public productId: number,

		public userId: number,

		public quantity: number,

		public value: number,

		public status?: SaleStatus,

		public id?: number,
	) {}
}
