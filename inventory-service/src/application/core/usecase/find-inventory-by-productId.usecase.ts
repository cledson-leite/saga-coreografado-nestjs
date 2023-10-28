import { NotFoundException } from '@nestjs/common';
import { FindInventoryByProductIdInput } from '../../ports/input/find-inventory-by-productId.input';
import { FindInventoryByProductIdOutput } from '../../ports/output/find-inventory-by-productId.output';
import { Inventory } from '../domain/inventory';

export class FindInventoryByProductIdUseCase
  implements FindInventoryByProductIdInput
{
  constructor(private readonly output: FindInventoryByProductIdOutput) {}
  async find(productId: number): Promise<Inventory> {
    const inventory = await this.output.find(productId);
    if (!inventory) throw new NotFoundException('Produto não encontrado!');
    return inventory;
  }
}
