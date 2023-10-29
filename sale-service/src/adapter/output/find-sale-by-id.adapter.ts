import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../../application/core/domain/sale';
import { FindSaleByIdOutput } from '../../application/ports/output/find-sale-by-id.output';
import { Injectable } from '@nestjs/common';
import { SaleEntity } from './entity/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindSaleByIdAdapter implements FindSaleByIdOutput {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly repository: Repository<SaleEntity>,
	) {}
	find(id: number): Promise<Sale> {
		return this.repository.findOneBy({ id });
	}
}
