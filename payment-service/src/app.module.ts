import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './adapter/input/message/payment.module';
import { PaymentEntity } from './adapter/output/entity/payment.entity';
import { UserEntity } from './adapter/output/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:postgres@localhost:5432/saga-sales?schema=public',
      entities: [PaymentEntity, UserEntity],
      // logging: true,
    }),
    PaymentModule,
  ],
})
export class AppModule {}
