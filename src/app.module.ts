import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payments/typeorm/entities/Payment';
import { User } from './payments/typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [Payment, User],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
