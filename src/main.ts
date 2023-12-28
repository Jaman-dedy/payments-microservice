import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('---- payment microservice is running');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  });
  await app.listen();
}
bootstrap();
