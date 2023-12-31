import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:19092'],
      },
      consumer: {
        groupId: 'payment',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(8083);
}
bootstrap();
