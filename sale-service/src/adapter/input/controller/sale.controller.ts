import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { RequestDto } from '../dto/RequestDto';

@Controller('/api/v1/sale')
export class SaleController {
	private readonly logger: Logger = new Logger('Sale');
	constructor(private readonly service: SaleService) {}

	@Post()
	async create(@Body() request: RequestDto) {
		request;
		this.logger.log('Iniciando venda ...');
		this.service.createSale(request);
		this.logger.log('Vanda registrada com sucesso!!');
	}
}
