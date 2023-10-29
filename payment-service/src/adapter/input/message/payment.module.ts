import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalePaymentUseCase } from '../../../application/core/usecase/sale-payment.usecase';
import { FindUserByIdUseCase } from '../../../application/core/usecase/find-user-by-id.usecase';
import { FindUserByIdInput } from '../../../application/ports/input/find-user-by-id.input';
import { UpdateUserOutput } from '../../../application/ports/output/update-user.output';
import { SavePaymentOutput } from '../../../application/ports/output/save-payment.output';
import { SendToKafkaOutput } from '../../../application/ports/output/send-to-kafka.output';
import { UserEntity } from '../../output/entity/user.entity';
import { PaymentEntity } from '../../output/entity/payment.entity';
import { UpdateUserAdapter } from '../../output/update-user.adapter';
import { SavePaymentAdapter } from '../../output/save-payment.adapter';
import { SendToKafkaAdapter } from '../../output/send-to-kafka.adapter';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FindUserByIdOutput } from '../../../application/ports/output/find-user-by-id.output';
import { FindUserByIdAdapter } from '../../output/find-user-by-id.adapter';

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
            groupId: 'payment',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([UserEntity, PaymentEntity]),
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: FindUserByIdUseCase.name,
      useFactory: (findUser: FindUserByIdOutput) =>
        new FindUserByIdUseCase(findUser),
      inject: [FindUserByIdAdapter],
    },
    {
      provide: FindUserByIdAdapter,
      useClass: FindUserByIdAdapter,
    },
    {
      provide: UpdateUserAdapter,
      useClass: UpdateUserAdapter,
    },
    {
      provide: SavePaymentAdapter,
      useClass: SavePaymentAdapter,
    },
    {
      provide: SendToKafkaAdapter,
      useClass: SendToKafkaAdapter,
    },
    {
      provide: 'input',
      useFactory: (
        findUser: FindUserByIdInput,
        updateUser: UpdateUserOutput,
        savePayment: SavePaymentOutput,
        sendToKafka: SendToKafkaOutput,
      ) =>
        new SalePaymentUseCase(findUser, updateUser, savePayment, sendToKafka),
      inject: [
        FindUserByIdUseCase.name,
        UpdateUserAdapter,
        SavePaymentAdapter,
        SendToKafkaAdapter,
      ],
    },
  ],
})
export class PaymentModule {}
