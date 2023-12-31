import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './adapter/input/message/inventory.module';
import { InventoryEntity } from './adapter/output/entity/inventory.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InventoryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:postgres@db:5432/saga-sales?schema=public',
      entities: [InventoryEntity],
    }),
  ],
})
export class AppModule {}
