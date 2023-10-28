import { Sale } from '../../core/domain/sale';

export interface CreateSaleInput {
	create(sale: Sale): Promise<void>;
}
