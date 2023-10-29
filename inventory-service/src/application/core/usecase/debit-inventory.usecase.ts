import { BadRequestException } from '@nestjs/common';
import { DebitInventoryInput } from '../../ports/input/debit-inventory.input';
import { FindInventoryByProductIdInput } from '../../ports/input/find-inventory-by-productId.input';
import { UpdateInventoryOutput } from '../../ports/output/update-inventory.output';
import { SendToKafkaOutput } from '../../ports/output/send-to-kafka.output';
import { Inventory } from '../domain/inventory';
import { Sale } from '../domain/sale';
import { SaleEvent } from '../domain/enums/sale-event.enum';

export class DebitInventoryUseCase implements DebitInventoryInput {
  constructor(
    private readonly findInventory: FindInventoryByProductIdInput,
    private readonly updateInventory: UpdateInventoryOutput,
    private readonly kafka: SendToKafkaOutput,
  ) {}
  async debit(sale: Sale): Promise<void> {
    try {
      const inventory: Inventory = await this.findInventory.find(
        sale.productId,
      );
      if (inventory.quantity < sale.quantity) {
        throw new BadRequestException('Estoque insuficiente');
      }
      inventory.debitQuantity(sale.quantity);
      this.updateInventory.update(inventory);
      this.kafka.send(sale, SaleEvent.UPDATED_INVENTORY);
    } catch (error) {
      this.kafka.send(sale, SaleEvent.ROLLBACK_INVENTORY);
    }
  }
}
