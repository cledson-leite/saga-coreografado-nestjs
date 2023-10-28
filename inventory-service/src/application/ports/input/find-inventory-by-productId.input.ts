import { Inventory } from '../../core/domain/inventory';
export interface FindInventoryByProductIdInput {
  find(productId: number): Promise<Inventory>;
}
