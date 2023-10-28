import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../application/core/domain/inventory';
import { UpdateInventoryOutput } from '../../application/ports/output/update-inventory.output';
import { InventoryEntity } from './entity/inventory.entity';

@Injectable()
export class UpdateInventoryAdapter implements UpdateInventoryOutput {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly repository: Repository<InventoryEntity>,
  ) {}

  async update(inventory: Inventory): Promise<void> {
    this.repository.update(inventory.id, inventory);
  }
}
