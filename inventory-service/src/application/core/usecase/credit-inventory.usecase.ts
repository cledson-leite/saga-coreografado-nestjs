import { CreditInventoryInput } from '../../ports/input/credit-inventory.input';
import { FindInventoryByProductIdOutput } from '../../ports/output/find-inventory-by-productId.output';
import { SendToKafkaOutput } from '../../ports/output/send-to-kafka.output';
import { UpdateInventoryOutput } from '../../ports/output/update-inventory.output';
import { SaleEvent } from '../domain/enums/sale-event.enum';
import { Sale } from '../domain/sale';

export class CreditInventoryUseCase implements CreditInventoryInput {
  constructor(
    private readonly findInventory: FindInventoryByProductIdOutput,
    private readonly updateInventory: UpdateInventoryOutput,
    private readonly kafka: SendToKafkaOutput,
  ) {}

  async credit(sale: Sale): Promise<void> {
    console.log('#### usecase ###');
    console.log(sale.quantity);
    const inventory = await this.findInventory.find(sale.productId);
    inventory.creditQuantity(sale.quantity);
    this.updateInventory.update(inventory);
    this.kafka.send(sale, SaleEvent.ROLLBACK_INVENTORY);
  }
}
