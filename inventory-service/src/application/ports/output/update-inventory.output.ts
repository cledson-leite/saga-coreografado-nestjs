import { Inventory } from '../../core/domain/inventory';

export interface UpdateInventoryOutput {
  update(inventory: Inventory): Promise<void>;
}
