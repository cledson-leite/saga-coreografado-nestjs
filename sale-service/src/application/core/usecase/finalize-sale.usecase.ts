import { FinalizeSaleInput } from '../../ports/input/finalize-sale.input';
import { FindSaleByIdOutput } from '../../ports/output/find-sale-by-id.output';
import { SaveSaleOutput } from '../../ports/output/save-sale.output';
import { SaleStatus } from '../domain/enums/sale-status.enum';
import { Sale } from '../domain/sale';

export class FinalizeSaleUseCase implements FinalizeSaleInput {
	constructor(
		private readonly findUser: FindSaleByIdOutput,
		private readonly saveUser: SaveSaleOutput,
	) {}
	async finalize(sale: Sale): Promise<void> {
		const saleResponse = await this.findUser.find(sale.id);
		saleResponse.status = SaleStatus.FINALIZED;
		this.saveUser.save(saleResponse);
	}
}
