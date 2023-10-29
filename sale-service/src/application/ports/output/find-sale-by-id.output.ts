import { Sale } from '../../core/domain/sale';

export interface FindSaleByIdOutput {
	find(id: number): Promise<Sale>;
}
