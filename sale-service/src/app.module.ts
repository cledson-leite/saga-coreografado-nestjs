import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleModule } from './adapter/input/controller/sale.module';
import { SaleEntity } from './adapter/output/entity/sale.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: 'postgresql://postgres:postgres@localhost:5432/saga-sales?schema=public',
			entities: [SaleEntity],
		}),
		SaleModule,
	],
})
export class AppModule {}
