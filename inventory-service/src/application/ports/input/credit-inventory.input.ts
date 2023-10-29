import { Sale } from '../../core/domain/sale';

export interface CreditInventoryInput {
  credit(sale: Sale): Promise<void>;
}
