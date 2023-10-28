import { Inventory } from '../../core/domain/inventory';
export interface FindInventoryByProductIdOutput {
  find(productId: number): Promise<Inventory>;
}
