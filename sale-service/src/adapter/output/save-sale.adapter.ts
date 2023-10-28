import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../../application/core/domain/sale';
import { SaveSaleOutput } from '../../application/ports/output/save-sale.output';
import { Repository } from 'typeorm';
import { SaleEntity } from './entity/sale.entity';

@Injectable()
export class SaveSaleAdapter implements SaveSaleOutput {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly repository: Repository<SaleEntity>,
	) {}
	async save(sale: Sale): Promise<Sale> {
		const userResponse = this.repository.create({ ...sale });
		await this.repository.save(userResponse);
		return userResponse;
	}
}
