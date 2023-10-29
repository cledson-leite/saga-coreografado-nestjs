import { Sale } from '../../core/domain/sale';

export interface CancelSaleInput {
	cancel(sale: Sale): Promise<void>;
}
