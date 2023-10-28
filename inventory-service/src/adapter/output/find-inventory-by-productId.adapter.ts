import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../application/core/domain/inventory';
import { FindInventoryByProductIdOutput } from '../../application/ports/output/find-inventory-by-productId.output';
import { InventoryEntity } from './entity/inventory.entity';

@Injectable()
export class FindInventoryByProductIdAdapter
  implements FindInventoryByProductIdOutput
{
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly repository: Repository<InventoryEntity>,
  ) {}
  async find(productId: number): Promise<Inventory> {
    const entity = await this.repository.findOne({
      where: { productId },
    });
    if (!entity) throw new NotFoundException('Produto não encontrado');
    return new Inventory(entity.id, entity.productId, entity.quantity);
  }
}
