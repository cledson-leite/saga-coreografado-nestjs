import { Sale } from '../../core/domain/sale';

export interface SalePaymentInput {
  payment(sale: Sale): Promise<void>;
}
