import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleModule } from './adapter/input/controller/sale.module';
import { SaleEntity } from './adapter/output/entity/sale.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: 'postgresql://postgres:postgres@localhost:5432/saga-sales?schema=public',
			entities: [SaleEntity],
		}),
		SaleModule,
	],
})
export class AppModule {}
