import { OnModuleInit, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { SaleEvent } from '../../application/core/domain/enums/sale-event.enum';
import { Sale } from '../../application/core/domain/sale';
import { SendToKafkaOutput } from '../../application/ports/output/send-to-kafka.output';
import { SaleMessage } from './message/sale.message';

@Injectable()
export class SendToKafkaAdapter implements SendToKafkaOutput, OnModuleInit {
  private producer: Producer;
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}
  async onModuleInit() {
    this.producer = await this.clientKafka.connect();
  }
  async send(sale: Sale, event: SaleEvent): Promise<void> {
    const msg: SaleMessage = new SaleMessage(sale, event);
    await this.producer.send({
      acks: 1,
      topic: 'saga-inventory',
      messages: [
        {
          key: `${Math.random() * 100}`,
          value: JSON.stringify(msg),
        },
      ],
    });
  }
}
