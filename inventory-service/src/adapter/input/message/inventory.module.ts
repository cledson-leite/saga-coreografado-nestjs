import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitInventoryUseCase } from '../../../application/core/usecase/debit-inventory.usecase';
import { FindInventoryByProductIdOutput } from '../../../application/ports/output/find-inventory-by-productId.output';
import { SendToKafkaOutput } from '../../../application/ports/output/send-to-kafka.output';
import { UpdateInventoryOutput } from '../../../application/ports/output/update-inventory.output';
import { InventoryEntity } from '../../output/entity/inventory.entity';
import { FindInventoryByProductIdAdapter } from '../../output/find-inventory-by-productId.adapter';
import { SendToKafkaAdapter } from '../../output/send-to-kafka.adapter';
import { UpdateInventoryAdapter } from '../../output/update-inventory.adapter';
import { InventoryController } from './inventory.controller';
import { CreditInventoryUseCase } from '../../../application/core/usecase/credit-inventory.usecase';

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
            groupId: 'inventory',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([InventoryEntity]),
  ],
  controllers: [InventoryController],
  providers: [
    {
      provide: FindInventoryByProductIdAdapter,
      useClass: FindInventoryByProductIdAdapter,
    },
    {
      provide: UpdateInventoryAdapter,
      useClass: UpdateInventoryAdapter,
    },
    {
      provide: SendToKafkaAdapter,
      useClass: SendToKafkaAdapter,
    },
    {
      provide: 'input',
      useFactory: (
        findInventory: FindInventoryByProductIdOutput,
        updateInventory: UpdateInventoryOutput,
        sendToKafka: SendToKafkaOutput,
      ) =>
        new DebitInventoryUseCase(findInventory, updateInventory, sendToKafka),
      inject: [
        FindInventoryByProductIdAdapter,
        UpdateInventoryAdapter,
        SendToKafkaAdapter,
      ],
    },
    {
      provide: 'usecase',
      useFactory: (
        findInventory: FindInventoryByProductIdOutput,
        updateInventory: UpdateInventoryOutput,
        sendToKafka: SendToKafkaOutput,
      ) =>
        new CreditInventoryUseCase(findInventory, updateInventory, sendToKafka),
      inject: [
        FindInventoryByProductIdAdapter,
        UpdateInventoryAdapter,
        SendToKafkaAdapter,
      ],
    },
  ],
})
export class InventoryModule {}
