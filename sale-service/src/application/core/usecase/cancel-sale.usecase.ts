import { CancelSaleInput } from '../../ports/input/cancel-sale.input';
import { FindSaleByIdOutput } from '../../ports/output/find-sale-by-id.output';
import { SaveSaleOutput } from '../../ports/output/save-sale.output';
import { SaleStatus } from '../domain/enums/sale-status.enum';
import { Sale } from '../domain/sale';

export class CancelSaleUseCase implements CancelSaleInput {
	constructor(
		private readonly findUser: FindSaleByIdOutput,
		private readonly saveUser: SaveSaleOutput,
	) {}
	async cancel(sale: Sale): Promise<void> {
		const saleResponse = await this.findUser.find(sale.id);
		saleResponse.status = SaleStatus.CANCELED;
		this.saveUser.save(saleResponse);
	}
}
