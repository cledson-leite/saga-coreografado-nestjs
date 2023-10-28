import { Inject, Injectable } from '@nestjs/common';
import { Sale } from '../../../application/core/domain/sale';
import { RequestDto } from '../dto/RequestDto';
import { CreateSaleInput } from '../../../application/ports/input/create-sale.input';

@Injectable()
export class SaleService {
	constructor(
		@Inject('input')
		private readonly input: CreateSaleInput,
	) {}
	async createSale({
		productId,
		userId,
		quantity,
		value,
	}: RequestDto): Promise<void> {
		const sale: Sale = new Sale(productId, userId, quantity, value);
		this.input.create(sale);
	}
}
