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

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'KAFKA_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: ['//localhost:9092'],
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
	],
})
export class SaleModule {}
