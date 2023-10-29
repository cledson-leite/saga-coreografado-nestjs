import { Payment } from '../../core/domain/payment';

export interface SavePaymentOutput {
  save(payment: Payment): Promise<void>;
}
