import { Body, Controller, Logger, Post, Inject } from '@nestjs/common';
import { SaleService } from './sale.service';
import { RequestDto } from '../dto/RequestDto';
import { FinalizeSaleInput } from '../../../application/ports/input/finalize-sale.input';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SaleMessage } from '../../output/message/sale.message';
import { SaleEvent } from '../../../application/core/domain/enums/sale-event.enum';

@Controller()
export class SaleController {
	private readonly logger: Logger = new Logger('Sale');
	constructor(
		private readonly service: SaleService,
		@Inject('usecase')
		private readonly input: FinalizeSaleInput,
	) {}

	@Post('/api/v1/sale')
	async create(@Body() request: RequestDto) {
		request;
		this.logger.log('Iniciando venda ...');
		this.service.createSale(request);
		this.logger.log('Venda registrada com sucesso!!');
	}
	@MessagePattern('saga-sale')
	finalize(@Payload() message: SaleMessage): void {
		const { sale, event } = message;
		if (SaleEvent.VALIDATED_PAYMENT === event) {
			this.logger.log('Iniciando finalização ...');
			this.input.finalize(sale);
			this.logger.log('Venda registrada com sucesso!!');
		}
	}
}
