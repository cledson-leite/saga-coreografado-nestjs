import { CreateSaleInput } from '../../ports/input/create-sale.input';
import { SaveSaleOutput } from '../../ports/output/save-sale.output';
import { SendToKafkaOutput } from '../../ports/output/send-to-kafka.output';
import { Sale } from '../domain/sale';
import { SaleEvent } from '../domain/enums/sale-event.enum';
import { SaleStatus } from '../domain/enums/sale-status.enum';

export class CreateSaleUserCase implements CreateSaleInput {
	constructor(
		private readonly saveSale: SaveSaleOutput,
		private readonly sendToKafka: SendToKafkaOutput,
	) {}
	async create(sale: Sale): Promise<void> {
		sale.status = SaleStatus.PENDING;
		const saleResponse: Sale = await this.saveSale.save(sale);
		this.sendToKafka.send(saleResponse, SaleEvent.CREATED_SALE);
	}
}
