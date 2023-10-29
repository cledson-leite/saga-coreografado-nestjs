import { Sale } from '../../core/domain/sale';

export interface FinalizeSaleInput {
	finalize(sale: Sale): Promise<void>;
}
