import { Sale } from '../../core/domain/sale';
export interface DebitInventoryInput {
  debit(sale: Sale): Promise<void>;
}
