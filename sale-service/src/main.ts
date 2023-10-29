import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: [
					process.env.NODE_ENV === 'production'
						? 'kafka:19092'
						: '//localhost:9092',
				],
			},
			consumer: {
				groupId: 'sale',
			},
		},
	});
	await app.startAllMicroservices();

	await app.listen(8081);
}
bootstrap();
