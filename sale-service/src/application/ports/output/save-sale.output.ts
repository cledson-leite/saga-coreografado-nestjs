import { Sale } from '../../core/domain/sale';
export interface SaveSaleOutput {
	save(sale: Sale): Promise<Sale>;
}
