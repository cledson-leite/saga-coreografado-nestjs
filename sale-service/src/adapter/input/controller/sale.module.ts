import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSaleUserCase } from '../../../application/core/usecase/create-sale.usecase';
import { SaveSaleAdapter } from '../../output/save-sale.adapter';
import { SaleEntity } from '../../output/entity/sale.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaveSaleOutput } from '../../../application/ports/output/save-sale.output';
import { SendToKafkaOutput } from '../../../application/ports/output/send-to-kafka.output';
import { SendToKafkaAdapter } from '../../output/send-to-kafka.adapter';
import { FindSaleByIdAdapter } from '../../output/find-sale-by-id.adapter';
import { FinalizeSaleUseCase } from '../../../application/core/usecase/finalize-sale.usecase';
import { FindSaleByIdOutput } from '../../../application/ports/output/find-sale-by-id.output';
import { CancelSaleUseCase } from '../../../application/core/usecase/cancel-sale.usecase';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'KAFKA_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: ['kafka:19092'],
					},
					consumer: {
						groupId: 'sale',
					},
				},
			},
		]),
		TypeOrmModule.forFeature([SaleEntity]),
	],
	controllers: [SaleController],
	providers: [
		SaleService,
		{
			provide: SaveSaleAdapter,
			useClass: SaveSaleAdapter,
		},
		{
			provide: FindSaleByIdAdapter,
			useClass: FindSaleByIdAdapter,
		},
		{
			provide: SendToKafkaAdapter,
			useClass: SendToKafkaAdapter,
		},
		{
			provide: 'input',
			useFactory: (
				saveSale: SaveSaleOutput,
				sendToKafka: SendToKafkaOutput,
			) => new CreateSaleUserCase(saveSale, sendToKafka),
			inject: [SaveSaleAdapter, SendToKafkaAdapter],
		},
		{
			provide: 'usecase',
			useFactory: (
				findUser: FindSaleByIdOutput,
				saveSale: SaveSaleOutput,
			) => new FinalizeSaleUseCase(findUser, saveSale),
			inject: [FindSaleByIdAdapter, SaveSaleAdapter],
		},
		{
			provide: 'rollback',
			useFactory: (
				findUser: FindSaleByIdOutput,
				saveSale: SaveSaleOutput,
			) => new CancelSaleUseCase(findUser, saveSale),
			inject: [FindSaleByIdAdapter, SaveSaleAdapter],
		},
	],
})
export class SaleModule {}
